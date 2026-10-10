# Smart Campus — Student Success Analytics

A responsive student-success prototype with a lightweight Node.js server and no third-party package dependencies. The 36 student records are fictional sample profiles across four academic programs. Student counts, scores, risks, segments, and filters are calculated from this sample set; intervention totals and trends are illustrative demo values.

## What the prototype demonstrates

- A unified student view with academic, attendance, LMS, engagement, skills, feedback, and placement categories. Student profiles and CSV exports include CGPA, marks, backlogs, subject performance, attendance by subject, LMS logins and assignment completion, events/clubs/hackathons/certifications, aptitude/coding/mock-interview readiness, technical/soft-skills assessments, and student/faculty feedback.
- Success and risk summaries with clickable cards that drill into the matching student cohort or recent intervention activity, an interactive semester/year trend chart, targeted student segments (including strong academics with low placement readiness), program/year/score/risk filters, search, and CSV export.
- A cohort-level decision-intelligence panel translates explicit academic, attendance, LMS, and placement thresholds into suggested human-led actions; recommendations update with the selected program and link to the matching student list.
- Student-level explainability showing weighted score contributions in descending order and the exact threshold(s) behind each risk flag, alongside contextual suggested next steps and an intervention log.
- Persistent staff-managed intervention plans with a supportive action, optional notes, follow-up date, planned/in-progress/completed status, and overdue filtering. Plans are visible to signed-in staff on this app instance.
- A short, keyboard-navigable demo presentation at `demo.html`; use the dashboard's **Demo slides** link or print/save the deck as a landscape PDF.
- Selected-student email composer with a personalized attendance check-in draft and editable recipient, subject, and message. Configured email is sent through the server-side Resend API.
- Responsive layouts for desktop and mobile.
- Local server-backed staff sign-in and sign-up at `auth.html` for Faculty and Administrators. Passwords are stored as salted scrypt hashes, and authenticated dashboard access uses an HTTP-only session cookie. No student login or sign-up is offered.
- The intervention activity list is held in browser memory for the current session; reloading resets it.
- Student email addresses in the sample roster are fictional; replace them with authorized, real student email addresses before use.
- Trend chart values and some intervention totals are illustrative demo data and should not be interpreted as actual historical campus performance.
- Detailed subject-level, activity, assessment, and faculty-feedback values shown in the sample profiles are illustrative values derived from synthetic profile indicators. They are not imported from real source systems and must be replaced with validated institutional records before use.
- The roster contains 36 fictional students across Computer Science, Business, Engineering, and Psychology.

## Local staff accounts

Run `npm start` and open `http://127.0.0.1:3000/auth.html` (do not open the HTML files directly). Staff can create a local account with a name, campus email, role, and password of at least 12 characters, then sign in with that account. The server stores accounts in the ignored local file `data/users.json`; passwords are salted and hashed with Node.js scrypt and are never stored as plain text. An HTTP-only, SameSite session cookie controls access to the dashboard and email endpoint. Sessions expire after eight hours and are cleared when signing out; restarting the server invalidates active sessions but preserves accounts. If port 3000 is already serving an older copy, stop that existing app server and rerun `npm start` to load the authentication changes.

## Student intervention plans

From the dashboard, choose **Create plan** in **Student intervention plans**, or open a student's profile and choose **Follow-up plan**. Select a practical, agreed action, add optional supportive notes, and choose the follow-up date. Staff can filter by planned, in-progress, completed, or overdue plans and update a plan's status. Plans persist in `data/intervention-plans.json` locally and are shared by signed-in staff using the same app server. On Render's free plan, the file is stored on ephemeral instance storage and may be lost after a restart, spin-down, or redeploy. Keep notes minimal and supportive; the demo does not provide per-student authorization, audit history, or institutional records management, so do not enter sensitive real-student details.

## Global website and installable app (Render)

The app includes a Progressive Web App manifest, an install button for supported browsers, and a service worker that caches only the public app shell. Dashboard HTML and all `/api/` requests remain network-only and are never cached offline. Install requires the deployed HTTPS site; on iPhone/iPad, open the site in Safari and use **Share → Add to Home Screen**.

To publish using Render:

1. Push this project to a private GitHub repository and connect that repository to Render.
2. Create a Render **Web Service** from `render.yaml`. The blueprint uses Render's free web-service plan and does not require payment information. Free instances can spin down after inactivity, and their local filesystem is ephemeral.
3. Wait for the deploy, open the `onrender.com` HTTPS URL, create an account, then use the browser's **Install app** option (or iOS Share menu).
4. Add a custom domain in Render if desired and keep TLS enabled.

Faculty can register without an invitation code; Administrator registration still requires one. Faculty sign-up is open to anyone and email ownership is not verified, so do not use open registration for real campus accounts or sensitive student data. Each deployment stores its user database and intervention plans on ephemeral instance storage, so accounts and plans may be lost when the free instance restarts, spins down, or redeploys. Staff accounts are not shared with a college identity provider, and the app still uses synthetic student records. A public URL does not integrate institutional student data or make this suitable for production student records. Obtain college approval and complete identity, privacy, and security integration before any real student use.

This is a self-hosted local-account implementation, not an institutional identity provider. Administrator registration requires `AUTH_ADMIN_SIGNUP_CODE`; set it to a long, private value in `.env` locally, or use the generated Render environment value. Accounts are stored only on the machine running this app, email ownership is not verified, and password reset, MFA, account recovery, and administrative account management are not implemented. The server binds to localhost. Do not expose it to a network or use it for real student data without HTTPS, a production identity provider or hardened deployment, verified staff authorization, and privacy/security review.

## Configure real email sending

Real email delivery uses the Resend API from a local Node.js backend. It never exposes the Resend API key to browser code.

1. Install Node.js 22.9 or later.
2. Create a Resend account, verify a sender domain you control, and create an API key.
3. Copy `.env.example` to `.env`. Set `RESEND_API_KEY` to the API key, `RESEND_FROM_EMAIL` to a sender on your verified domain (for example, `Student Success Support <support@your-domain.edu>`), and `STUDENT_EMAIL_DOMAIN` to the exact approved student recipient domain.
4. Replace the sample student email addresses in `app.js` with authorized student addresses on that recipient domain.
5. Run `npm start` and open `http://127.0.0.1:3000`. Do not open `index.html` directly as a `file://` URL for email sending.

The server binds only to localhost, restricts recipients to the configured student email domain, and limits sending to five messages per minute per local client. The composer shows delivery errors rather than claiming success when the provider rejects a request. A successful response means Resend accepted the message; check its dashboard for final delivery or bounce status.

The local authentication is not production-grade and does not implement verified recipient-to-student authorization, audit logging, consent controls, or institutional identity management. Do not expose this app to a network or use it for real student data without those safeguards and a security review.

## Score and risk methodology

The prototype presents a 0–100 Student Success Score as a weighted average of normalized indicators. It is a transparent rules-based analytics baseline, not a trained AI prediction:

| Indicator | Weight | Demo signal |
| --- | ---: | --- |
| Academic performance | 35% | CGPA normalized to a 0–100 scale, with backlogs shown as context |
| Attendance | 20% | Percentage of classes attended |
| LMS activity | 15% | Activity index reflecting logins and assignment completion |
| Engagement and skills | 15% | Mean of engagement and skills indices |
| Placement readiness | 15% | A synthetic readiness index with pathway-relevant sample measures: coding for Computer Science, or discipline skills for other programs; aptitude and mock-interview measures are shown for all |

Risk is **High** below 50. Scores below 65 are **Elevated**; students scoring 65 or above are also flagged **Elevated** when attendance is below 75%, LMS activity is below 45%, or a student with CGPA of at least 3.2 has placement readiness below 50. Other students are **On track**. A production implementation should calculate these from validated source data, exclude unavailable indicators, and normalize the remaining weights. Risk flags should prompt a supportive human check-in; they are not labels or automated decisions. The displayed examples are representative synthetic data, not a validated predictive model.

Each profile lists the weighted point contribution (`normalized indicator × weight`) for the five score components, largest contribution first. Student profiles also include program-relevant skills, a pathway-specific assessment, and example entry-level placement options: Business includes marketing/sales, finance/accounting, and HR/operations; Psychology includes HR/talent acquisition, research assistance, and community outreach; Engineering includes quality assurance, production planning, and CAD/design. Related skill examples include spreadsheet literacy, market research, active listening, research methods, safety awareness, and applied design. Coding remains a Computer Science assessment and is marked optional and unused for non-IT pathways. These generated examples are synthetic suggestions, not verified qualifications, live vacancies, or guaranteed placements; students should be supported to explore roles matching their interests and credentials. The risk explanation names the rule that triggered the assigned flag. The placement-gap segment selects students with an academic index of at least 75/100 and placement readiness below 50/100; it is a targeting aid, not a prediction of employment outcomes.

## Demo deck and suggested walkthrough

Open `demo.html` for eight concise slides covering the challenge, integrated data, score formula, current sample insights, explainability, mapping to all five evaluation criteria, the two bonus features and their rubric mappings, and responsible-use/production considerations. The decision-intelligence panel in the dashboard surfaces rule-triggered recommendations and lets faculty review the students matching each signal. The evaluation slide lists the supplied weights (Data Integration & Analysis 30%; Success Score & Risk Identification 25%; Dashboard & Visualization 25%; Problem Understanding 10%; Presentation & Demo 10%) and describes prototype coverage without claiming a judging score. The bonus slide maps segmentation to Success Score & Risk Identification, and explainability to Dashboard & Visualization; it notes the approximate 5–10 point combined cap and does not claim bonus points. Use left/right arrow keys or the on-slide controls to navigate; **Print / save PDF** prints each slide on its own landscape page. The statistics are a snapshot of the synthetic roster.

1. Start on Overview and point out the semester trend and students who may benefit from a check-in.
2. Filter by program or open a segment such as academic support or placement readiness.
3. Open a student to inspect the individual drivers and suggested, human-led next step.
4. Log an intervention and export the current filtered list to CSV.
5. Open “Our scoring approach” to explain the weights, risk bands, and responsible-use caveat.

## Production integration notes

Connect the prototype to institution-approved SIS, LMS, attendance, placement, skills, engagement, and feedback sources. Define data ownership and refresh cadence, validate missingness and cohort fairness, establish role-based access and retention policies, and evaluate any predictive model with advisors and students before using it in practice. The current score is a transparent rules-based baseline, not a trained AI model; it intentionally avoids implying predictive accuracy without validated outcome data.
