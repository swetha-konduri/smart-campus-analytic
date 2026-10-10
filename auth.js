const signinForm = document.getElementById("signin-form");
const signupForm = document.getElementById("signup-form");
const signinTab = document.getElementById("signin-tab");
const signupTab = document.getElementById("signup-tab");
const formStatus = document.getElementById("form-status");

function setAuthMode(mode) {
  const isSignup = mode === "signup";
  signinTab.classList.toggle("active", !isSignup);
  signupTab.classList.toggle("active", isSignup);
  signinTab.setAttribute("aria-selected", String(!isSignup));
  signupTab.setAttribute("aria-selected", String(isSignup));
  signinForm.hidden = isSignup;
  signupForm.hidden = !isSignup;
  document.getElementById("form-title").textContent = isSignup ? "Create your staff profile" : "Welcome to Smart Campus";
  document.getElementById("form-subtitle").textContent = isSignup
    ? "Create a local Faculty or Administrator account."
    : "Sign in with your campus account.";
  const isAdministratorSignup = isSignup && document.getElementById("signup-role").value === "Administrator";
  document.getElementById("signup-invite-field").hidden = !isAdministratorSignup;
  document.getElementById("signup-invite-code").required = isAdministratorSignup;
  formStatus.hidden = true;
  formStatus.textContent = "";
}

signinTab.addEventListener("click", () => setAuthMode("signin"));
signupTab.addEventListener("click", () => setAuthMode("signup"));
document.getElementById("signup-role").addEventListener("change", () => setAuthMode("signup"));

document.querySelectorAll(".password-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.toggle);
    const showPassword = input.type === "password";
    input.type = showPassword ? "text" : "password";
    button.textContent = showPassword ? "Hide" : "Show";
    button.setAttribute("aria-label", `${showPassword ? "Hide" : "Show"} password`);
  });
});

document.querySelectorAll(".forgot-button").forEach((button) => {
  button.addEventListener("click", () => {
    formStatus.textContent = "Password reset is not available in this prototype. Please contact your campus support team.";
    formStatus.hidden = false;
  });
});

async function enterDashboard(event) {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const formData = new FormData(form);
  const isSignup = form.id === "signup-form";
  const email = String(formData.get("email")).trim();
  const password = String(formData.get("password"));
  const name = isSignup ? String(formData.get("name")).trim() : "";
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  formStatus.hidden = true;
  try {
    const response = await fetch(isSignup ? "/api/auth/signup" : "/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({
        role: formData.get("role"),
        email,
        password,
        ...(isSignup ? {
          name,
          ...(formData.get("signupCode") ? { signupCode: String(formData.get("signupCode")) } : {})
        } : {})
      })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Authentication failed.");
    if (isSignup && "PasswordCredential" in window && navigator.credentials) {
      try {
        const credential = new PasswordCredential({ id: email, password, name });
        await navigator.credentials.store(credential);
      } catch (error) {
        console.warn("The browser could not save this sign-up credential.", error);
      }
    }
    if (isSignup) {
      document.getElementById("signin-role").value = String(formData.get("role"));
      document.getElementById("signin-email").value = email;
      document.getElementById("signin-password").value = password;
      setAuthMode("signin");
      formStatus.textContent = "Account created. Sign in with your email and password to continue.";
      formStatus.hidden = false;
      return;
    }
    window.location.assign("index.html");
  } catch (error) {
    formStatus.textContent = error instanceof TypeError
      ? "Could not reach the authentication server. Start the app with npm start and try again."
      : error.message;
    formStatus.hidden = false;
  } finally {
    button.disabled = false;
  }
}

signinForm.addEventListener("submit", enterDashboard);
signupForm.addEventListener("submit", enterDashboard);
