import { createServer } from "node:http";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const root = resolve(fileURLToPath(new URL(".", import.meta.url)));
const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 3000);
const maxBodyBytes = 16 * 1024;
const usersDirectory = resolve(root, "data");
const usersFile = resolve(process.env.AUTH_USERS_FILE || resolve(usersDirectory, "users.json"));
const interventionPlansFile = resolve(dirname(usersFile), "intervention-plans.json");
const sessionCookie = "smart_campus_session";
const sessionLifetimeMs = 8 * 60 * 60 * 1000;
const sessions = new Map();
const authAttempts = new Map();
const scrypt = promisify(scryptCallback);
let accountWriteQueue = Promise.resolve();
let interventionPlanWriteQueue = Promise.resolve();
const sendWindowMs = 60_000;
const maxSendsPerWindow = 5;
const sendAttempts = new Map();
const publicFiles = new Set(["index.html", "app.js", "styles.css", "auth.html", "auth.js", "auth.css", "demo.html", "pwa.js", "service-worker.js", "manifest.webmanifest", "icons/app-icon.svg"]);
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml"
};

class RequestError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function setSecurityHeaders(response) {
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Referrer-Policy", "same-origin");
  response.setHeader("X-Frame-Options", "DENY");
  response.setHeader("Content-Security-Policy", "default-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline'; connect-src 'self'; img-src 'self' data:");
}

function sendJson(response, status, data) {
  setSecurityHeaders(response);
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  });
  response.end(JSON.stringify(data));
}

async function readJson(request) {
  let size = 0;
  const chunks = [];
  for await (const chunk of request) {
    size += chunk.length;
    if (size > maxBodyBytes) throw new RequestError(413, "Request body is too large.");
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new RequestError(400, "Request body must be valid JSON.");
  }
}

function requireJson(request) {
  if (!request.headers["content-type"]?.toLowerCase().startsWith("application/json")) {
    throw new RequestError(415, "Requests must use application/json.");
  }
}

function requireSameOrigin(request) {
  const origin = request.headers.origin;
  if (!origin) throw new RequestError(403, "Request origin could not be verified.");
  let parsedOrigin;
  try {
    parsedOrigin = new URL(origin);
  } catch {
    throw new RequestError(403, "Request origin could not be verified.");
  }
  if (parsedOrigin.host !== request.headers.host) {
    throw new RequestError(403, "Cross-origin requests are not allowed.");
  }
}

function parseCookies(request) {
  const cookies = new Map();
  for (const part of (request.headers.cookie || "").split(";")) {
    const separator = part.indexOf("=");
    if (separator > 0) cookies.set(part.slice(0, separator).trim(), part.slice(separator + 1).trim());
  }
  return cookies;
}

function activeSession(request) {
  const token = parseCookies(request).get(sessionCookie);
  if (!token) return null;
  const session = sessions.get(token);
  if (!session) return null;
  if (session.expiresAt <= Date.now()) {
    sessions.delete(token);
    return null;
  }
  return { token, session };
}

function setSessionCookie(response, token) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  response.setHeader("Set-Cookie", `${sessionCookie}=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${Math.floor(sessionLifetimeMs / 1000)}${secure}`);
}

function clearSessionCookie(response) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  response.setHeader("Set-Cookie", `${sessionCookie}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0${secure}`);
}

async function loadAccounts() {
  try {
    const content = await readFile(usersFile, "utf8");
    const accounts = JSON.parse(content);
    if (!Array.isArray(accounts)) throw new Error("Account database format is invalid.");
    return accounts;
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function saveAccounts(accounts) {
  await mkdir(usersDirectory, { recursive: true });
  const temporaryFile = `${usersFile}.${process.pid}.${randomBytes(6).toString("hex")}.tmp`;
  await writeFile(temporaryFile, JSON.stringify(accounts, null, 2), { encoding: "utf8", mode: 0o600 });
  await rename(temporaryFile, usersFile);
}

function withAccountWriteLock(operation) {
  const result = accountWriteQueue.then(operation);
  accountWriteQueue = result.catch(() => {});
  return result;
}

async function loadInterventionPlans() {
  try {
    const content = await readFile(interventionPlansFile, "utf8");
    const plans = JSON.parse(content);
    if (!Array.isArray(plans)) throw new Error("Intervention plan database format is invalid.");
    return plans;
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

async function saveInterventionPlans(plans) {
  await mkdir(dirname(interventionPlansFile), { recursive: true });
  const temporaryFile = `${interventionPlansFile}.${process.pid}.${randomBytes(6).toString("hex")}.tmp`;
  await writeFile(temporaryFile, JSON.stringify(plans, null, 2), { encoding: "utf8", mode: 0o600 });
  await rename(temporaryFile, interventionPlansFile);
}

function withInterventionPlanWriteLock(operation) {
  const result = interventionPlanWriteQueue.then(operation);
  interventionPlanWriteQueue = result.catch(() => {});
  return result;
}

function validateInterventionPlan(data, account) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new RequestError(400, "Intervention plan details are invalid.");
  }
  const studentId = typeof data.studentId === "string" ? data.studentId.trim() : "";
  const studentName = typeof data.studentName === "string" ? data.studentName.trim() : "";
  const title = typeof data.title === "string" ? data.title.trim() : "";
  const description = typeof data.description === "string" ? data.description.trim() : "";
  const dueDate = typeof data.dueDate === "string" ? data.dueDate : "";
  if (!/^STU-\d+$/.test(studentId) || studentName.length < 2 || studentName.length > 100) {
    throw new RequestError(400, "Select a valid student for this intervention plan.");
  }
  if (title.length < 3 || title.length > 120) {
    throw new RequestError(400, "Plan title must be between 3 and 120 characters.");
  }
  if (description.length > 2000) {
    throw new RequestError(400, "Plan notes must be 2,000 characters or fewer.");
  }
  const parsedDueDate = /^\d{4}-\d{2}-\d{2}$/.test(dueDate) ? Date.parse(`${dueDate}T00:00:00.000Z`) : NaN;
  if (!Number.isFinite(parsedDueDate) || new Date(parsedDueDate).toISOString().slice(0, 10) !== dueDate) {
    throw new RequestError(400, "Choose a valid follow-up date.");
  }
  return {
    studentId,
    studentName,
    title,
    description,
    dueDate,
    createdBy: { name: account.name, email: account.email }
  };
}

async function handleInterventionPlans(request, response, pathname) {
  const active = activeSession(request);
  const account = active ? await findAccountById(active.session.accountId) : null;
  if (!account) {
    if (active) sessions.delete(active.token);
    sendJson(response, 401, { error: "Sign in to view or manage intervention plans." });
    return;
  }

  if (pathname === "/api/intervention-plans" && request.method === "GET") {
    const plans = await loadInterventionPlans();
    plans.sort((first, second) => first.dueDate.localeCompare(second.dueDate) || second.createdAt.localeCompare(first.createdAt));
    sendJson(response, 200, { plans });
    return;
  }

  if (pathname === "/api/intervention-plans" && request.method === "POST") {
    requireSameOrigin(request);
    requireJson(request);
    const input = validateInterventionPlan(await readJson(request), account);
    const plan = await withInterventionPlanWriteLock(async () => {
      const plans = await loadInterventionPlans();
      const now = new Date().toISOString();
      const created = {
        id: randomBytes(16).toString("hex"),
        ...input,
        status: "Planned",
        createdAt: now,
        updatedAt: now
      };
      plans.push(created);
      await saveInterventionPlans(plans);
      return created;
    });
    sendJson(response, 201, { plan });
    return;
  }

  const planId = pathname.match(/^\/api\/intervention-plans\/([a-f0-9]{32})$/i)?.[1];
  if (planId && request.method === "PATCH") {
    requireSameOrigin(request);
    requireJson(request);
    const data = await readJson(request);
    const statuses = ["Planned", "In progress", "Completed"];
    if (!data || typeof data !== "object" || Array.isArray(data) || !statuses.includes(data.status)) {
      throw new RequestError(400, "Choose a valid intervention plan status.");
    }
    const plan = await withInterventionPlanWriteLock(async () => {
      const plans = await loadInterventionPlans();
      const current = plans.find((item) => item.id === planId);
      if (!current) throw new RequestError(404, "Intervention plan was not found.");
      current.status = data.status;
      current.updatedAt = new Date().toISOString();
      await saveInterventionPlans(plans);
      return current;
    });
    sendJson(response, 200, { plan });
    return;
  }

  if (pathname === "/api/intervention-plans" || planId) {
    response.setHeader("Allow", pathname === "/api/intervention-plans" ? "GET, POST" : "PATCH");
    sendJson(response, 405, { error: "Method not allowed for intervention plans." });
    return;
  }
  sendJson(response, 404, { error: "Intervention plan endpoint not found." });
}

function validateStaffCredentials(data, signup) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new RequestError(400, "Account details are invalid.");
  }
  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  const password = typeof data.password === "string" ? data.password : "";
  const role = data.role;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    throw new RequestError(400, "Enter a valid campus email address.");
  }
  if (!["Faculty", "Administrator"].includes(role)) {
    throw new RequestError(400, "Select Faculty or Administrator.");
  }
  if (password.length < 12 || password.length > 256) {
    throw new RequestError(400, "Password must be between 12 and 256 characters.");
  }
  let name = "";
  if (signup) {
    name = typeof data.name === "string" ? data.name.trim() : "";
    if (name.length < 2 || name.length > 100) throw new RequestError(400, "Enter your name (2–100 characters).");
    if (role === "Administrator") {
      const invite = process.env.AUTH_ADMIN_SIGNUP_CODE?.trim();
      if (!invite) throw new RequestError(503, "Administrator sign-up is disabled. Ask the app administrator to configure an invitation code.");
      if (typeof data.signupCode !== "string" || data.signupCode !== invite) {
        throw new RequestError(403, "Administrator sign-up requires a valid invitation code.");
      }
    }
  }
  return { email, password, role, name };
}

function checkAuthRateLimit(request) {
  const now = Date.now();
  const address = request.socket.remoteAddress || "local";
  const recentAttempts = (authAttempts.get(address) || []).filter((timestamp) => now - timestamp < 15 * 60_000);
  if (recentAttempts.length >= 10) throw new RequestError(429, "Too many sign-in attempts. Wait 15 minutes and try again.");
  recentAttempts.push(now);
  authAttempts.set(address, recentAttempts);
}

async function hashPassword(password, salt = randomBytes(16)) {
  const derived = await scrypt(password, salt, 64, { N: 16_384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 });
  return `scrypt$${salt.toString("hex")}$${derived.toString("hex")}`;
}

async function verifyPassword(password, storedHash) {
  const [algorithm, saltHex, hashHex] = storedHash.split("$");
  if (algorithm !== "scrypt" || !/^[a-f0-9]{32}$/i.test(saltHex) || !/^[a-f0-9]{128}$/i.test(hashHex)) return false;
  const expected = Buffer.from(hashHex, "hex");
  const actual = await scrypt(password, Buffer.from(saltHex, "hex"), expected.length, { N: 16_384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 });
  return timingSafeEqual(expected, actual);
}

function publicAccount(account) {
  return { name: account.name, email: account.email, role: account.role };
}

function createSession(account, response) {
  const now = Date.now();
  for (const [token, session] of sessions) {
    if (session.expiresAt <= now) sessions.delete(token);
  }
  const token = randomBytes(32).toString("hex");
  sessions.set(token, { accountId: account.id, expiresAt: now + sessionLifetimeMs });
  setSessionCookie(response, token);
  return publicAccount(account);
}

async function findAccountById(id) {
  const accounts = await loadAccounts();
  return accounts.find((account) => account.id === id) || null;
}

async function handleAuth(request, response, pathname) {
  if (pathname === "/api/auth/session") {
    if (request.method !== "GET") {
      response.setHeader("Allow", "GET");
      throw new RequestError(405, "Use GET to check the current session.");
    }
    const active = activeSession(request);
    const account = active ? await findAccountById(active.session.accountId) : null;
    if (!account) {
      if (active) sessions.delete(active.token);
      sendJson(response, 401, { error: "Sign in is required." });
      return;
    }
    sendJson(response, 200, { user: publicAccount(account) });
    return;
  }

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    throw new RequestError(405, "Use POST for this authentication action.");
  }
  requireSameOrigin(request);

  if (pathname === "/api/auth/logout") {
    const active = activeSession(request);
    if (active) sessions.delete(active.token);
    clearSessionCookie(response);
    sendJson(response, 200, { ok: true });
    return;
  }

  requireJson(request);
  checkAuthRateLimit(request);
  const data = await readJson(request);

  if (pathname === "/api/auth/signup") {
    const input = validateStaffCredentials(data, true);
    const user = await withAccountWriteLock(async () => {
      const accounts = await loadAccounts();
      if (accounts.some((account) => account.email === input.email)) {
        throw new RequestError(409, "An account with this email already exists. Sign in instead.");
      }
      const account = {
        id: randomBytes(16).toString("hex"),
        email: input.email,
        name: input.name,
        role: input.role,
        passwordHash: await hashPassword(input.password),
        createdAt: new Date().toISOString()
      };
      accounts.push(account);
      await saveAccounts(accounts);
      return account;
    });
    sendJson(response, 201, { user: publicAccount(user) });
    return;
  }

  if (pathname === "/api/auth/signin") {
    const input = validateStaffCredentials(data, false);
    const accounts = await loadAccounts();
    const account = accounts.find((item) => item.email === input.email && item.role === input.role);
    const valid = account && await verifyPassword(input.password, account.passwordHash);
    if (!valid) throw new RequestError(401, "Email, password, or account type is incorrect.");
    sendJson(response, 200, { user: createSession(account, response) });
    return;
  }

  throw new RequestError(404, "Authentication endpoint not found.");
}

function validateEmailRequest(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new RequestError(400, "Email request is invalid.");
  }
  const { studentId, to, subject, text } = data;
  if (typeof studentId !== "string" || !/^STU-\d+$/.test(studentId)) {
    throw new RequestError(400, "Select a valid student before sending email.");
  }
  if (typeof to !== "string" || to.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    throw new RequestError(400, "Enter a valid student email address.");
  }
  const allowedDomain = process.env.STUDENT_EMAIL_DOMAIN?.trim().toLowerCase();
  if (!allowedDomain) {
    throw new RequestError(503, "Email is not configured. Set STUDENT_EMAIL_DOMAIN in your local .env file.");
  }
  if (to.split("@")[1].toLowerCase() !== allowedDomain) {
    throw new RequestError(400, `Email can only be sent to an address at ${allowedDomain}.`);
  }
  if (typeof subject !== "string" || !subject.trim() || subject.length > 200 || /[\r\n]/.test(subject)) {
    throw new RequestError(400, "Subject is required and must be under 200 characters.");
  }
  if (typeof text !== "string" || !text.trim() || text.length > 10_000) {
    throw new RequestError(400, "Message is required and must be under 10,000 characters.");
  }
  return { to: to.trim(), subject: subject.trim(), text };
}

function checkRateLimit(request) {
  const now = Date.now();
  const address = request.socket.remoteAddress || "local";
  const recentAttempts = (sendAttempts.get(address) || []).filter((timestamp) => now - timestamp < sendWindowMs);
  if (recentAttempts.length >= maxSendsPerWindow) {
    throw new RequestError(429, "Too many emails sent. Please wait a minute and try again.");
  }
  recentAttempts.push(now);
  sendAttempts.set(address, recentAttempts);
}

async function sendEmail(request, response) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (!apiKey || apiKey === "re_your_api_key" || !from || from.includes("your-verified-domain") || !process.env.STUDENT_EMAIL_DOMAIN?.trim() || process.env.STUDENT_EMAIL_DOMAIN.includes("your-college")) {
    sendJson(response, 503, {
      error: "Email service is not configured. Set RESEND_API_KEY, RESEND_FROM_EMAIL, and STUDENT_EMAIL_DOMAIN in .env."
    });
    return;
  }
  if (!request.headers["content-type"]?.toLowerCase().startsWith("application/json")) {
    sendJson(response, 415, { error: "Send email requests must use application/json." });
    return;
  }

  const data = validateEmailRequest(await readJson(request));
  checkRateLimit(request);
  let resendResponse;
  try {
    resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: [data.to],
        subject: data.subject,
        text: data.text
      }),
      signal: AbortSignal.timeout(15_000)
    });
  } catch (error) {
    console.error("Resend request failed:", error.message);
    sendJson(response, 502, { error: "Could not reach Resend. Check your internet connection and try again." });
    return;
  }

  let result;
  try {
    result = await resendResponse.json();
  } catch {
    result = {};
  }
  if (!resendResponse.ok) {
    const providerMessage = typeof result.message === "string" ? result.message : "Resend rejected the request.";
    console.error(`Resend rejected an email with HTTP ${resendResponse.status}: ${providerMessage}`);
    sendJson(response, 502, {
      error: `Email was not sent. Resend returned: ${providerMessage}`,
      retryable: resendResponse.status >= 500
    });
    return;
  }
  if (typeof result.id !== "string") {
    console.error("Resend returned success without an email ID.");
    sendJson(response, 502, { error: "Email provider response could not be verified. Check the Resend dashboard before retrying." });
    return;
  }
  sendJson(response, 200, { id: result.id });
}

async function serveStatic(pathname, response, account) {
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    sendJson(response, 400, { error: "Invalid URL path." });
    return;
  }
  const fileName = decodedPath === "/" ? "index.html" : decodedPath.slice(1);
  if (!publicFiles.has(fileName)) {
    sendJson(response, 404, { error: "Page not found." });
    return;
  }
  if (fileName === "index.html" && !account) {
    response.writeHead(303, { Location: "/auth.html", "Cache-Control": "no-store" });
    response.end();
    return;
  }
  const filePath = resolve(root, fileName);
  if (!filePath.startsWith(`${root}${sep}`)) {
    sendJson(response, 404, { error: "Page not found." });
    return;
  }
  try {
    const contents = await readFile(filePath);
    setSecurityHeaders(response);
    response.writeHead(200, {
      "Content-Type": contentTypes[extname(fileName)],
      "Cache-Control": fileName === "index.html" ? "no-store" : "no-cache"
    });
    response.end(contents);
  } catch (error) {
    if (error.code === "ENOENT") {
      sendJson(response, 404, { error: "Page not found." });
      return;
    }
    throw error;
  }
}

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url, `http://${host}:${port}`).pathname;
  try {
    if (pathname === "/healthz" && (request.method === "GET" || request.method === "HEAD")) {
      response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" });
      response.end(request.method === "HEAD" ? undefined : "ok");
      return;
    }
    if (pathname.startsWith("/api/auth/")) {
      await handleAuth(request, response, pathname);
      return;
    }
    if (pathname === "/api/intervention-plans" || pathname.startsWith("/api/intervention-plans/")) {
      await handleInterventionPlans(request, response, pathname);
      return;
    }
    if (pathname === "/api/send-email") {
      if (request.method !== "POST") {
        response.setHeader("Allow", "POST");
        sendJson(response, 405, { error: "Use POST to send an email." });
        return;
      }
      requireSameOrigin(request);
      const active = activeSession(request);
      if (!active || !await findAccountById(active.session.accountId)) {
        sendJson(response, 401, { error: "Sign in before sending email." });
        return;
      }
      await sendEmail(request, response);
      return;
    }
    if (request.method !== "GET" && request.method !== "HEAD") {
      response.setHeader("Allow", "GET, HEAD");
      sendJson(response, 405, { error: "Method not allowed." });
      return;
    }
    const active = activeSession(request);
    const account = active ? await findAccountById(active.session.accountId) : null;
    await serveStatic(pathname, response, account);
  } catch (error) {
    if (error instanceof RequestError) {
      sendJson(response, error.status, { error: error.message });
      return;
    }
    console.error("Request failed:", error);
    sendJson(response, 500, { error: "Unexpected server error. Check the local server log." });
  }
});

server.listen(port, host, () => {
  console.log(`Smart Campus is listening on ${host}:${port}`);
  console.log("Staff sign-in uses local accounts; passwords are stored as scrypt hashes.");
  console.log("Email service sends only to STUDENT_EMAIL_DOMAIN and is rate-limited to 5 messages per minute.");
});
