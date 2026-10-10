const students = [
  { id: "STU-1042", name: "Maya Patel", program: "Computer Science", year: "3rd year", score: 42, risk: "High", keySignal: "Attendance dropped to 61%", lastCheck: "2 days ago", cgpa: 2.2, attendance: 61, lms: 38, engagement: 24, placement: 41, skills: 46, backlog: 3, satisfaction: 3.1, email: "maya.patel@northstar.edu", trend: -8, interventions: [] },
  { id: "STU-1088", name: "Jordan Lee", program: "Engineering", year: "2nd year", score: 48, risk: "High", keySignal: "3 unresolved course backlogs", lastCheck: "Never", cgpa: 2.7, attendance: 72, lms: 54, engagement: 31, placement: 49, skills: 52, backlog: 3, satisfaction: 3.4, email: "jordan.lee@northstar.edu", trend: -5, interventions: [] },
  { id: "STU-1016", name: "Sofia Ramirez", program: "Business", year: "4th year", score: 56, risk: "Elevated", keySignal: "Placement readiness below cohort", lastCheck: "5 days ago", cgpa: 3.5, attendance: 87, lms: 68, engagement: 51, placement: 29, skills: 39, backlog: 0, satisfaction: 3.8, email: "sofia.ramirez@northstar.edu", trend: 2, interventions: [] },
  { id: "STU-1120", name: "Ethan Brooks", program: "Computer Science", year: "3rd year", score: 59, risk: "Elevated", keySignal: "LMS activity down 34% this month", lastCheck: "1 week ago", cgpa: 3.1, attendance: 78, lms: 41, engagement: 55, placement: 63, skills: 66, backlog: 1, satisfaction: 3.7, email: "ethan.brooks@northstar.edu", trend: -4, interventions: [] },
  { id: "STU-1067", name: "Ava Thompson", program: "Psychology", year: "2nd year", score: 61, risk: "Elevated", keySignal: "Attendance below 75% threshold", lastCheck: "3 days ago", cgpa: 3.3, attendance: 69, lms: 73, engagement: 61, placement: 57, skills: 72, backlog: 1, satisfaction: 4.0, email: "ava.thompson@northstar.edu", trend: 1, interventions: [] },
  { id: "STU-1149", name: "Noah Williams", program: "Engineering", year: "4th year", score: 63, risk: "Elevated", keySignal: "Two skills assessments incomplete", lastCheck: "12 days ago", cgpa: 3.7, attendance: 91, lms: 79, engagement: 58, placement: 44, skills: 32, backlog: 0, satisfaction: 4.2, email: "noah.williams@northstar.edu", trend: 3, interventions: [] },
  { id: "STU-1039", name: "Isabella Chen", program: "Computer Science", year: "3rd year", score: 66, risk: "On track", keySignal: "Placement practice is improving", lastCheck: "Yesterday", cgpa: 3.6, attendance: 89, lms: 84, engagement: 71, placement: 48, skills: 63, backlog: 0, satisfaction: 4.1, email: "isabella.chen@northstar.edu", trend: 6, interventions: [] },
  { id: "STU-1093", name: "Liam Anderson", program: "Business", year: "2nd year", score: 69, risk: "On track", keySignal: "Consistent attendance this term", lastCheck: "4 days ago", cgpa: 3.4, attendance: 92, lms: 76, engagement: 64, placement: 58, skills: 67, backlog: 0, satisfaction: 4.3, email: "liam.anderson@northstar.edu", trend: 3, interventions: [] },
  { id: "STU-1111", name: "Priya Nair", program: "Computer Science", year: "4th year", score: 72, risk: "On track", keySignal: "Coding score up 18 points", lastCheck: "Yesterday", cgpa: 3.8, attendance: 94, lms: 91, engagement: 73, placement: 62, skills: 76, backlog: 0, satisfaction: 4.5, email: "priya.nair@northstar.edu", trend: 9, interventions: [] },
  { id: "STU-1174", name: "Oliver Garcia", program: "Engineering", year: "3rd year", score: 74, risk: "On track", keySignal: "Strong peer mentoring engagement", lastCheck: "6 days ago", cgpa: 3.6, attendance: 88, lms: 82, engagement: 92, placement: 69, skills: 81, backlog: 0, satisfaction: 4.4, email: "oliver.garcia@northstar.edu", trend: 4, interventions: [] },
  { id: "STU-1055", name: "Amara Okafor", program: "Psychology", year: "4th year", score: 79, risk: "On track", keySignal: "High engagement across campus", lastCheck: "2 days ago", cgpa: 3.9, attendance: 96, lms: 89, engagement: 95, placement: 72, skills: 86, backlog: 0, satisfaction: 4.8, email: "amara.okafor@northstar.edu", trend: 5, interventions: [] },
  { id: "STU-1102", name: "Theo Kim", program: "Business", year: "3rd year", score: 83, risk: "On track", keySignal: "All indicators above cohort average", lastCheck: "Yesterday", cgpa: 4.0, attendance: 97, lms: 95, engagement: 84, placement: 85, skills: 91, backlog: 0, satisfaction: 4.7, email: "theo.kim@northstar.edu", trend: 7, interventions: [] },
  { id: "STU-1201", name: "Zara Ahmed", program: "Computer Science", year: "2nd year", score: 58, risk: "Elevated", keySignal: "LMS activity needs a boost", lastCheck: "Never", cgpa: 3.0, attendance: 82, lms: 42, engagement: 55, placement: 58, skills: 61, backlog: 1, satisfaction: 3.8, email: "zara.ahmed@northstar.edu", trend: -2, interventions: [] },
  { id: "STU-1202", name: "Mateo Silva", program: "Engineering", year: "3rd year", score: 67, risk: "On track", keySignal: "Backlog cleared this semester", lastCheck: "4 days ago", cgpa: 3.2, attendance: 86, lms: 78, engagement: 70, placement: 64, skills: 74, backlog: 0, satisfaction: 4.1, email: "mateo.silva@northstar.edu", trend: 5, interventions: [] },
  { id: "STU-1203", name: "Grace Park", program: "Business", year: "2nd year", score: 76, risk: "On track", keySignal: "Leading her project team", lastCheck: "Yesterday", cgpa: 3.8, attendance: 93, lms: 88, engagement: 82, placement: 68, skills: 85, backlog: 0, satisfaction: 4.6, email: "grace.park@northstar.edu", trend: 6, interventions: [] },
  { id: "STU-1204", name: "Darius Johnson", program: "Psychology", year: "3rd year", score: 48, risk: "High", keySignal: "Attendance and LMS activity both low", lastCheck: "2 weeks ago", cgpa: 2.5, attendance: 67, lms: 39, engagement: 43, placement: 52, skills: 50, backlog: 2, satisfaction: 3.3, email: "darius.johnson@northstar.edu", trend: -7, interventions: [] },
  { id: "STU-1205", name: "Elena Petrova", program: "Computer Science", year: "4th year", score: 72, risk: "On track", keySignal: "Mock interview confidence improving", lastCheck: "3 days ago", cgpa: 3.7, attendance: 91, lms: 87, engagement: 76, placement: 68, skills: 78, backlog: 0, satisfaction: 4.2, email: "elena.petrova@northstar.edu", trend: 8, interventions: [] },
  { id: "STU-1206", name: "Caleb Foster", program: "Engineering", year: "2nd year", score: 62, risk: "Elevated", keySignal: "Attendance recently fell below 75%", lastCheck: "6 days ago", cgpa: 3.1, attendance: 71, lms: 74, engagement: 59, placement: 55, skills: 65, backlog: 1, satisfaction: 3.9, email: "caleb.foster@northstar.edu", trend: -3, interventions: [] },
  { id: "STU-1207", name: "Nia Campbell", program: "Business", year: "4th year", score: 54, risk: "Elevated", keySignal: "Strong grades, placement practice needed", lastCheck: "Never", cgpa: 3.8, attendance: 90, lms: 75, engagement: 63, placement: 31, skills: 46, backlog: 0, satisfaction: 4.0, email: "nia.campbell@northstar.edu", trend: 1, interventions: [] },
  { id: "STU-1208", name: "Arjun Mehta", program: "Computer Science", year: "3rd year", score: 80, risk: "On track", keySignal: "Hackathon project earned peer recognition", lastCheck: "2 days ago", cgpa: 3.9, attendance: 96, lms: 91, engagement: 88, placement: 72, skills: 90, backlog: 0, satisfaction: 4.7, email: "arjun.mehta@northstar.edu", trend: 7, interventions: [] },
  { id: "STU-1209", name: "Chloe Dubois", program: "Psychology", year: "2nd year", score: 64, risk: "Elevated", keySignal: "Several LMS assignments incomplete", lastCheck: "8 days ago", cgpa: 3.4, attendance: 84, lms: 43, engagement: 68, placement: 62, skills: 70, backlog: 0, satisfaction: 3.9, email: "chloe.dubois@northstar.edu", trend: -1, interventions: [] },
  { id: "STU-1210", name: "Samuel Okoye", program: "Engineering", year: "4th year", score: 45, risk: "High", keySignal: "Two unresolved course backlogs", lastCheck: "10 days ago", cgpa: 2.2, attendance: 75, lms: 48, engagement: 39, placement: 43, skills: 46, backlog: 2, satisfaction: 3.2, email: "samuel.okoye@northstar.edu", trend: -6, interventions: [] },
  { id: "STU-1211", name: "Mei Lin", program: "Business", year: "3rd year", score: 72, risk: "On track", keySignal: "Steady gains in placement readiness", lastCheck: "Yesterday", cgpa: 3.5, attendance: 94, lms: 82, engagement: 79, placement: 70, skills: 82, backlog: 0, satisfaction: 4.5, email: "mei.lin@northstar.edu", trend: 6, interventions: [] },
  { id: "STU-1212", name: "Rafael Costa", program: "Computer Science", year: "2nd year", score: 59, risk: "Elevated", keySignal: "Attendance is trending down", lastCheck: "1 week ago", cgpa: 3.2, attendance: 73, lms: 68, engagement: 55, placement: 59, skills: 60, backlog: 1, satisfaction: 3.7, email: "rafael.costa@northstar.edu", trend: -4, interventions: [] },
  { id: "STU-1213", name: "Fatima Hassan", program: "Psychology", year: "4th year", score: 83, risk: "On track", keySignal: "Excellent feedback and campus engagement", lastCheck: "2 days ago", cgpa: 3.9, attendance: 98, lms: 94, engagement: 93, placement: 75, skills: 91, backlog: 0, satisfaction: 4.9, email: "fatima.hassan@northstar.edu", trend: 8, interventions: [] },
  { id: "STU-1214", name: "Benjamin Clark", program: "Engineering", year: "3rd year", score: 53, risk: "Elevated", keySignal: "Technical skills assessment incomplete", lastCheck: "Never", cgpa: 3.3, attendance: 83, lms: 62, engagement: 49, placement: 42, skills: 35, backlog: 1, satisfaction: 3.6, email: "benjamin.clark@northstar.edu", trend: 0, interventions: [] },
  { id: "STU-1215", name: "Anika Rao", program: "Computer Science", year: "4th year", score: 90, risk: "On track", keySignal: "Placement offer received", lastCheck: "Yesterday", cgpa: 4.0, attendance: 99, lms: 96, engagement: 88, placement: 92, skills: 95, backlog: 0, satisfaction: 4.8, email: "anika.rao@northstar.edu", trend: 10, interventions: [] },
  { id: "STU-1216", name: "Miles Turner", program: "Business", year: "2nd year", score: 42, risk: "High", keySignal: "Attendance below 60% this term", lastCheck: "3 weeks ago", cgpa: 2.4, attendance: 58, lms: 46, engagement: 35, placement: 44, skills: 42, backlog: 2, satisfaction: 3.0, email: "miles.turner@northstar.edu", trend: -9, interventions: [] },
  { id: "STU-1217", name: "Yuki Tanaka", program: "Psychology", year: "3rd year", score: 75, risk: "On track", keySignal: "Consistent participation in student groups", lastCheck: "4 days ago", cgpa: 3.7, attendance: 91, lms: 89, engagement: 94, placement: 61, skills: 72, backlog: 0, satisfaction: 4.6, email: "yuki.tanaka@northstar.edu", trend: 5, interventions: [] },
  { id: "STU-1218", name: "Imani Brooks", program: "Engineering", year: "2nd year", score: 69, risk: "On track", keySignal: "Academic progress improving", lastCheck: "2 days ago", cgpa: 3.4, attendance: 87, lms: 79, engagement: 72, placement: 63, skills: 75, backlog: 0, satisfaction: 4.3, email: "imani.brooks@northstar.edu", trend: 7, interventions: [] },
  { id: "STU-1219", name: "Lucas Müller", program: "Computer Science", year: "3rd year", score: 57, risk: "Elevated", keySignal: "Placement coding practice is low", lastCheck: "9 days ago", cgpa: 3.5, attendance: 86, lms: 77, engagement: 58, placement: 34, skills: 41, backlog: 0, satisfaction: 4.0, email: "lucas.mueller@northstar.edu", trend: -2, interventions: [] },
  { id: "STU-1220", name: "Aisha Bello", program: "Business", year: "4th year", score: 66, risk: "On track", keySignal: "Completed two employer mock interviews", lastCheck: "Yesterday", cgpa: 3.5, attendance: 92, lms: 81, engagement: 75, placement: 58, skills: 72, backlog: 0, satisfaction: 4.4, email: "aisha.bello@northstar.edu", trend: 4, interventions: [] },
  { id: "STU-1221", name: "Henry Walsh", program: "Psychology", year: "2nd year", score: 55, risk: "Elevated", keySignal: "Low LMS activity and one backlog", lastCheck: "11 days ago", cgpa: 2.9, attendance: 80, lms: 37, engagement: 59, placement: 56, skills: 61, backlog: 1, satisfaction: 3.5, email: "henry.walsh@northstar.edu", trend: -3, interventions: [] },
  { id: "STU-1222", name: "Sana Qureshi", program: "Computer Science", year: "2nd year", score: 77, risk: "On track", keySignal: "Great progress in programming coursework", lastCheck: "3 days ago", cgpa: 3.8, attendance: 92, lms: 94, engagement: 71, placement: 70, skills: 83, backlog: 0, satisfaction: 4.5, email: "sana.qureshi@northstar.edu", trend: 8, interventions: [] },
  { id: "STU-1223", name: "David Mensah", program: "Engineering", year: "4th year", score: 62, risk: "Elevated", keySignal: "Placement interviews need more practice", lastCheck: "5 days ago", cgpa: 3.6, attendance: 89, lms: 76, engagement: 69, placement: 37, skills: 52, backlog: 0, satisfaction: 4.0, email: "david.mensah@northstar.edu", trend: 2, interventions: [] },
  { id: "STU-1224", name: "Eva Schneider", program: "Business", year: "3rd year", score: 80, risk: "On track", keySignal: "Excellent attendance and assignment completion", lastCheck: "Yesterday", cgpa: 3.9, attendance: 98, lms: 96, engagement: 82, placement: 74, skills: 87, backlog: 0, satisfaction: 4.7, email: "eva.schneider@northstar.edu", trend: 7, interventions: [] }
];

const weights = { academic: 0.35, attendance: 0.20, lms: 0.15, engagement: 0.15, placement: 0.15 };
const state = { risk: "all", search: "", program: "all", year: "all", scoreRange: "all", focus: "", page: 1, pageSize: 6 };
const interventionLog = [];
const emailActivityLog = [];
let interventionPlans = [];
let planStudentId = "";
const byId = (id) => document.getElementById(id);
function getStaffProfile() {
  return window.smartCampusStaff || { role: "Faculty", email: "", name: "" };
}
function staffDisplayName(profile) {
  if (typeof profile.name === "string" && profile.name.trim()) return profile.name.trim();
  const localPart = profile.email.split("@")[0].replace(/[._-]+/g, " ").trim();
  if (!localPart) return "Campus staff";
  return localPart.replace(/\b\w/g, (letter) => letter.toUpperCase());
}
function updateStaffIdentity(profile) {
  const name = staffDisplayName(profile);
  const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  byId("profile-name").textContent = name;
  byId("profile-role").textContent = profile.role;
  document.querySelectorAll(".profile-initials, .staff-profile-initials, #top-profile-button").forEach((element) => {
    element.textContent = initials || "SC";
  });
  byId("staff-profile-name").textContent = name;
  byId("staff-profile-role").textContent = profile.role;
  byId("staff-profile-email").textContent = profile.email || "Not provided (dashboard opened directly)";
}
function openStaffProfile() {
  updateStaffIdentity(getStaffProfile());
  byId("profile-backdrop").classList.add("open");
  byId("profile-close").focus();
}
function closeStaffProfile() {
  byId("profile-backdrop").classList.remove("open");
}
let currentEmailStudentId = null;
const trendData = {
  semester: {
    labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
    scoreOffsets: [-6, -5, -5, -3, -1, 0],
    riskOffsets: [7, 6, 5, 3, 2, 0]
  },
  year: {
    labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    scoreOffsets: [-11, -10, -8, -9, -7, -6, -5, -3, -4, -2, -1, 0],
    riskOffsets: [10, 9, 8, 8, 7, 6, 5, 4, 3, 2, 1, 0]
  }
};

function academicSignal(student) {
  return Math.round((student.cgpa / 4) * 100);
}

function engagementSignal(student) {
  return Math.round((student.engagement + student.skills) / 2);
}

function scoreFor(student) {
  return Math.round(
    academicSignal(student) * weights.academic +
    student.attendance * weights.attendance +
    student.lms * weights.lms +
    engagementSignal(student) * weights.engagement +
    student.placement * weights.placement
  );
}

function studentDataGroups(student) {
  const seed = Number(student.id.slice(-2)) || 0;
  const offset = (slot) => ((seed * (slot + 3)) % 13) - 6;
  const score = (base, slot) => Math.max(0, Math.min(100, Math.round(base + offset(slot))));
  const courses = {
    "Computer Science": ["Programming", "Data structures", "Database systems"],
    Business: ["Accounting", "Business analytics", "Management"],
    Engineering: ["Engineering fundamentals", "Applied design", "Laboratory"],
    Psychology: ["Research methods", "Developmental psychology", "Statistics"]
  }[student.program] || ["Core subject", "Applied subject", "Elective"];
  const academicBase = Math.round(student.cgpa * 25);
  const studentFeedback = student.satisfaction.toFixed(1);
  const facultyFeedback = Math.max(1, Math.min(5, student.satisfaction + offset(12) / 10)).toFixed(1);
  const activityCount = (base, divisor, slot, max) => Math.max(0, Math.min(max, Math.round(base / divisor + offset(slot) / 3)));
  const careerProfile = {
    "Computer Science": {
      skills: ["Analytical thinking", "Team collaboration", "Technical communication", "Responsible data use"],
      placementAssessment: "Technical interview & portfolio review",
      placements: ["Junior software developer", "QA / test analyst", "Data support analyst"]
    },
    Business: {
      skills: ["Business communication", "Financial & spreadsheet literacy", "Market research", "Customer relationship skills", "Presentation & negotiation", "Project coordination"],
      placementAssessment: "Business case, spreadsheet & communication assessment",
      placements: ["Marketing or sales coordinator", "Finance or accounting associate", "HR or operations assistant"]
    },
    Engineering: {
      skills: ["Project planning", "Quality & safety awareness", "Technical documentation", "Systems thinking", "Applied design", "Team coordination"],
      placementAssessment: "Applied design, quality & safety assessment",
      placements: ["Quality assurance technician", "Production planning assistant", "CAD / design technician"]
    },
    Psychology: {
      skills: ["Active listening", "Empathy & ethical practice", "Research literacy", "Report writing", "Survey & data interpretation", "Group facilitation"],
      placementAssessment: "Research methods, ethics & communication assessment",
      placements: ["HR or talent acquisition assistant", "Research assistant", "Community outreach coordinator"]
    }
  }[student.program] || {
    skills: ["Communication", "Critical thinking", "Team collaboration", "Project planning"],
    placementAssessment: "Communication, problem-solving & domain assessment",
    placements: ["Program-related entry-level role", "Project support assistant", "Operations coordinator"]
  };
  const placementItems = [
    ["Aptitude assessment", `${score(student.placement, 12)} / 100`]
  ];
  if (student.program === "Computer Science") {
    placementItems.push(
      ["Coding assessment", `${score((student.placement + student.skills) / 2, 13)} / 100`],
      ["Domain skills assessment", "Not used for this pathway"]
    );
  } else {
    placementItems.push(
      ["Domain skills assessment", `${score(student.skills, 13)} / 100`],
      ["Coding assessment", "Optional — not used for this pathway"]
    );
  }
  placementItems.push(
    ["Pathway-specific assessment", `${careerProfile.placementAssessment} · ${score(student.skills, 14)} / 100`],
    ["Suggested entry-level placements", careerProfile.placements.join(" · ")]
  );
  placementItems.push(["Mock interviews", `${activityCount(student.placement, 30, 14, 4)} completed · ${score(student.placement, 15)} readiness`]);

  return [
    {
      name: "Academic",
      items: [
        ["CGPA", `${student.cgpa.toFixed(1)} / 4.0`],
        ["Average marks", `${academicBase}%`],
        ["Backlogs", String(student.backlog)],
        ["Subject performance", courses.map((course, index) => `${course} ${score(academicBase, index)}%`).join(" · ")]
      ]
    },
    {
      name: "Attendance",
      items: [
        ["Overall attendance", `${student.attendance}%`],
        ["Subject-wise attendance", courses.map((course, index) => `${course} ${score(student.attendance, index + 3)}%`).join(" · ")]
      ]
    },
    {
      name: "LMS",
      items: [
        ["Logins per week", `${Math.max(0, Math.min(21, Math.round(student.lms / 6 + offset(6) / 3)))}`],
        ["Assignment completion", `${score(student.lms, 7)}%`],
        ["Activity index", `${student.lms} / 100`]
      ]
    },
    {
      name: "Engagement",
      items: [
        ["Events attended", `${activityCount(student.engagement, 12, 8, 12)}`],
        ["Club participation", `${activityCount(student.engagement, 25, 9, 4)} clubs`],
        ["Hackathons", `${activityCount(student.engagement, 30, 10, 4)}`],
        ["Certifications", `${activityCount(student.skills, 18, 11, 6)}`]
      ]
    },
    {
      name: "Placement",
      items: placementItems
    },
    {
      name: "Career & transferable skills",
      items: [
        ["Discipline skills assessment", `${score(student.skills, 16)} / 100`],
        ["Transferable-skills assessment", `${score((student.skills + student.engagement) / 2, 17)} / 100`],
        ...careerProfile.skills.map((skill, index) => [skill, `${score((student.skills + student.engagement) / 2, 18 + index)} / 100`]),
        ["Combined skills index", `${student.skills} / 100`]
      ]
    },
    {
      name: "Feedback",
      items: [
        ["Student satisfaction", `${studentFeedback} / 5`],
        ["Faculty feedback", `${facultyFeedback} / 5`]
      ]
    }
  ];
}

function riskFor(student) {
  if (student.score < 50) return "High";
  const hasPrioritySignal = student.score < 65 ||
    student.attendance < 75 ||
    student.lms < 45 ||
    (student.placement < 50 && student.cgpa >= 3.2);
  return hasPrioritySignal ? "Elevated" : "On track";
}

function riskReasons(student) {
  if (student.score < 50) return ["Success score is below the High-risk threshold of 50."];
  const reasons = [];
  if (student.score < 65) reasons.push(`Success score is below 65 (${student.score}).`);
  if (student.attendance < 75) reasons.push(`Attendance is below 75% (${student.attendance}%).`);
  if (student.lms < 45) reasons.push(`LMS activity is below 45 (${student.lms}/100).`);
  if (student.placement < 50 && student.cgpa >= 3.2) {
    reasons.push(`Placement readiness is below 50 (${student.placement}/100) despite a CGPA of ${student.cgpa.toFixed(1)}.`);
  }
  return reasons.length ? reasons : ["No current risk thresholds are triggered."];
}

function hasAcademicPlacementGap(student) {
  return academicSignal(student) >= 75 && student.placement < 50;
}

students.forEach((student) => {
  student.score = scoreFor(student);
  student.risk = riskFor(student);
});

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function initials(name) {
  return name.split(" ").map((part) => part[0]).slice(0, 2).join("");
}

function getFilteredStudents() {
  const query = state.search.trim().toLowerCase();
  return students.filter((student) => {
    const matchesProgram = state.program === "all" || student.program === state.program;
    const matchesYear = state.year === "all" || student.year === state.year;
    const [minimumScore, maximumScore] = state.scoreRange === "all"
      ? [0, 100]
      : state.scoreRange.split("-").map(Number);
    const matchesScore = student.score >= minimumScore && student.score <= maximumScore;
    const matchesRisk = state.risk === "all" || student.risk === state.risk;
    const matchesSearch = !query || `${student.name} ${student.id} ${student.program} ${student.email}`.toLowerCase().includes(query);
    let matchesFocus = true;
    if (state.focus === "academic") matchesFocus = student.score < 60 || student.attendance < 75 || student.backlog >= 2;
    if (state.focus === "placement") matchesFocus = hasAcademicPlacementGap(student);
    if (state.focus === "engagement") matchesFocus = student.engagement < 60;
    if (state.focus === "low-score") matchesFocus = student.score < 65;
    if (state.focus === "attendance") matchesFocus = student.attendance < 75;
    if (state.focus === "lms") matchesFocus = student.lms < 45;
    if (state.focus === "high-risk") matchesFocus = student.risk === "High";
    if (state.focus === "priority") matchesFocus = student.risk !== "On track";
    return matchesProgram && matchesYear && matchesScore && matchesRisk && matchesSearch && matchesFocus;
  });
}

function renderRows() {
  const visible = getFilteredStudents();
  const pageCount = Math.max(1, Math.ceil(visible.length / state.pageSize));
  state.page = Math.min(state.page, pageCount);
  const pageItems = visible.slice((state.page - 1) * state.pageSize, state.page * state.pageSize);
  byId("student-rows").innerHTML = pageItems.map((student, index) => {
    const color = student.score < 50 ? "score-low" : student.score < 65 ? "score-mid" : "score-good";
    const riskClass = student.risk.toLowerCase().replace(" ", "-");
    const initialsClass = ["avatar-peach", "avatar-lilac", "avatar-blue", "avatar-sage", "avatar-yellow", "avatar-rose"][((state.page - 1) * state.pageSize + index) % 6];
    return `<tr data-student="${escapeHtml(student.id)}">
      <td><button class="student-name-button" data-open-student="${escapeHtml(student.id)}"><span class="avatar ${initialsClass}">${escapeHtml(initials(student.name))}</span><span><strong>${escapeHtml(student.name)}</strong><small>${escapeHtml(student.id)}</small></span></button></td>
      <td><span class="program-cell">${escapeHtml(student.program)}</span><small class="year-cell">${escapeHtml(student.year)}</small></td>
      <td><div class="score-cell"><strong class="${color}">${student.score}</strong><div class="score-track"><span class="${color}" style="width:${student.score}%"></span></div><span class="score-trend ${student.trend >= 0 ? "trend-up" : "trend-down"}">${student.trend >= 0 ? "↗" : "↘"} ${Math.abs(student.trend)}</span></div></td>
      <td><span class="risk-badge ${riskClass}"><i></i>${escapeHtml(student.risk)}</span></td>
      <td><span class="signal-text">${escapeHtml(student.keySignal)}</span></td>
      <td class="last-check">${escapeHtml(student.lastCheck)}</td>
      <td><button class="row-more" data-student-action="${escapeHtml(student.id)}" aria-label="Open ${escapeHtml(student.name)} details">···</button></td>
    </tr>`;
  }).join("");
  byId("empty-state").hidden = visible.length > 0;
  byId("table-summary").textContent = visible.length
    ? `Showing ${Math.min(pageItems.length, visible.length)} of ${visible.length} student${visible.length === 1 ? "" : "s"}`
    : "No students to show";
  byId("table-count").textContent = visible.length;
  byId("page-number").textContent = `${state.page} / ${pageCount}`;
  byId("prev-page").disabled = state.page === 1;
  byId("next-page").disabled = state.page === pageCount;
}

function syncDirectoryControls() {
  document.querySelectorAll(".table-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.risk === state.risk);
  });
  document.querySelectorAll(".focus-item").forEach((item) => {
    item.setAttribute("aria-pressed", String(item.dataset.focus === state.focus));
  });
  document.querySelectorAll(".metric-drilldown[data-metric-action]").forEach((card) => {
    const action = card.dataset.metricAction;
    const selected = action === "all"
      ? state.risk === "all" && !state.focus && !state.search && state.year === "all" && state.scoreRange === "all"
      : action === "priority"
        ? state.focus === "priority"
        : action === "low-score" && state.focus === "low-score";
    if (action !== "interventions") card.setAttribute("aria-pressed", String(selected));
  });
}

function applyDirectoryFilter({ risk = "all", focus = "", resetCohortFilters = false } = {}) {
  state.risk = risk;
  state.focus = focus;
  state.search = "";
  state.page = 1;
  byId("student-search").value = "";
  if (resetCohortFilters) {
    state.year = "all";
    state.scoreRange = "all";
    byId("year-filter").value = "all";
    byId("score-filter").value = "all";
  }
  syncDirectoryControls();
  renderRows();
  byId("students").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderMetrics() {
  const roster = state.program === "all" ? students : students.filter((student) => student.program === state.program);
  const average = Math.round(roster.reduce((sum, student) => sum + student.score, 0) / roster.length);
  const needsSupport = roster.filter((student) => student.risk !== "On track");
  byId("metric-students").textContent = String(roster.length);
  byId("metric-score").textContent = String(average);
  byId("metric-risk").innerHTML = `${needsSupport.length}<small> students</small>`;
  byId("nav-risk-count").textContent = String(needsSupport.length);
  byId("tab-all-count").textContent = String(roster.length);
  byId("tab-high-count").textContent = String(roster.filter((student) => student.risk === "High").length);
  byId("tab-elevated-count").textContent = String(roster.filter((student) => student.risk === "Elevated").length);
  byId("focus-academic").textContent = roster.filter((student) => student.score < 60 || student.attendance < 75 || student.backlog >= 2).length;
  byId("focus-placement").textContent = roster.filter(hasAcademicPlacementGap).length;
  byId("focus-engagement").textContent = roster.filter((student) => student.engagement < 60).length;
  renderDecisionInsights(roster);
}

function renderDecisionInsights(roster) {
  const priorityCount = roster.filter((student) => student.risk !== "On track").length;
  const count = (predicate) => roster.filter(predicate).length;
  const programName = state.program === "all" ? "All programs" : state.program;
  byId("decision-cohort").textContent = `${programName} · ${roster.length} student${roster.length === 1 ? "" : "s"}`;
  byId("decision-summary").textContent = roster.length
    ? `${priorityCount} of ${roster.length} students have a High or Elevated flag. These signals can guide timely, supportive conversations.`
    : "No students are in this cohort. Choose another program to view recommendations.";

  const recommendations = [
    {
      id: "high-risk",
      count: count((student) => student.risk === "High"),
      title: "Coordinate an urgent check-in",
      reason: "Success score below 50",
      action: "Advisor: reach out privately, understand barriers, and agree on an academic support plan."
    },
    {
      id: "attendance",
      count: count((student) => student.attendance < 75),
      title: "Explore attendance barriers",
      reason: "Attendance below 75%",
      action: "Advisor: review subject patterns, ask what is getting in the way, and plan a manageable catch-up."
    },
    {
      id: "lms",
      count: count((student) => student.lms < 45),
      title: "Restore LMS momentum",
      reason: "LMS activity below 45/100",
      action: "Faculty: check assignment access and completion; offer a short LMS walkthrough or study check-in."
    },
    {
      id: "placement",
      count: count(hasAcademicPlacementGap),
      title: "Target placement coaching",
      reason: "Academic index 75+ · placement readiness below 50",
      action: "Career services: offer aptitude/coding practice or a mock interview matched to the student's goals."
    }
  ];

  byId("decision-insights").innerHTML = recommendations.map((item) => `
    <article class="decision-card${item.count ? "" : " decision-card-clear"}">
      <div class="decision-card-top"><span class="decision-count">${item.count}</span><span class="decision-trigger">${escapeHtml(item.reason)}</span></div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.count ? item.action : "No students in this cohort currently meet this signal threshold.")}</p>
      <button type="button" class="decision-action" data-decision-focus="${item.id}"${item.count ? "" : " disabled"}>${item.count ? `Review ${item.count} student${item.count === 1 ? "" : "s"} →` : "No students to review"}</button>
    </article>`).join("");
}

function renderInterventions() {
  const activity = [
    ...interventionLog.map((entry) => ({ ...entry, detail: "Advisor check-in logged", icon: "↗" })),
    ...emailActivityLog.map((entry) => ({ ...entry, detail: `Sent via Resend · accepted for delivery · ${entry.to}`, icon: "✉" }))
  ].sort((first, second) => second.createdAt - first.createdAt);
  byId("activity-count").textContent = `${activity.length} logged this session`;
  byId("intervention-list").innerHTML = activity.length
    ? activity.map((entry) => `<div class="intervention-entry"><span class="activity-icon">${entry.icon}</span><span><strong>${escapeHtml(entry.studentName)}</strong><small>${escapeHtml(entry.detail)}</small></span><time>${escapeHtml(entry.time)}</time></div>`).join("")
    : '<p class="activity-empty">Check-ins you log from a student profile will appear here.</p>';
}

function isPlanOverdue(plan) {
  const today = new Date();
  const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return plan.status !== "Completed" && plan.dueDate < localToday;
}

function renderInterventionPlans() {
  const filter = byId("plan-filter").value;
  const filteredPlans = interventionPlans.filter((plan) =>
    filter === "all" ||
    (filter === "overdue" ? isPlanOverdue(plan) : plan.status === filter)
  );
  const overdueCount = interventionPlans.filter(isPlanOverdue).length;
  byId("plans-summary").textContent = interventionPlans.length
    ? `${interventionPlans.length} plan${interventionPlans.length === 1 ? "" : "s"} · ${overdueCount} overdue · ${interventionPlans.filter((plan) => plan.status === "Completed").length} completed`
    : "Set a supportive next step, follow-up date, and status for each student.";
  byId("plans-list").innerHTML = filteredPlans.length
    ? filteredPlans.map((plan) => {
      const overdue = isPlanOverdue(plan);
      const dueLabel = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeZone: "UTC" })
        .format(new Date(`${plan.dueDate}T00:00:00.000Z`));
      const statusClass = plan.status.toLowerCase().replace(" ", "-");
      return `<article class="plan-card${overdue ? " plan-overdue" : ""}">
        <div class="plan-card-main">
          <div class="plan-card-top"><strong>${escapeHtml(plan.title)}</strong><span class="plan-badge ${statusClass}">${overdue ? "Overdue" : escapeHtml(plan.status)}</span></div>
          <button type="button" class="plan-student-link" data-plan-student="${escapeHtml(plan.studentId)}">${escapeHtml(plan.studentName)} · ${escapeHtml(plan.studentId)}</button>
          ${plan.description ? `<p class="plan-description">${escapeHtml(plan.description)}</p>` : ""}
          <div class="plan-meta"><span>${overdue ? "Past due" : "Follow-up"} · ${escapeHtml(dueLabel)}</span><span>Assigned to ${escapeHtml(plan.createdBy.name || plan.createdBy.email)}</span></div>
        </div>
        <label class="plan-status-control"><span>Status</span><select data-plan-status="${escapeHtml(plan.id)}" aria-label="Update status for ${escapeHtml(plan.title)}">
          ${["Planned", "In progress", "Completed"].map((status) => `<option value="${status}"${plan.status === status ? " selected" : ""}>${status}</option>`).join("")}
        </select></label>
      </article>`;
    }).join("")
    : `<p class="activity-empty">${filter === "all" ? "No intervention plans yet. Create a plan to agree a follow-up with a student." : "No plans match this status filter."}</p>`;
}

async function loadInterventionPlans() {
  const status = byId("plans-status");
  status.hidden = true;
  try {
    const response = await fetch("/api/intervention-plans", { cache: "no-store", credentials: "same-origin" });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not load intervention plans.");
    if (!Array.isArray(result.plans)) throw new Error("The server returned an invalid intervention plan list.");
    interventionPlans = result.plans;
    renderInterventionPlans();
  } catch (error) {
    status.textContent = error instanceof TypeError
      ? "Could not reach the server to load intervention plans."
      : error.message;
    status.hidden = false;
    byId("plans-list").innerHTML = '<p class="activity-empty">Intervention plans are unavailable. Please reload to try again.</p>';
  }
}

function openPlanForm(studentId = "") {
  planStudentId = studentId;
  byId("plan-student").innerHTML = students.map((student) =>
    `<option value="${escapeHtml(student.id)}"${student.id === studentId ? " selected" : ""}>${escapeHtml(student.name)} · ${escapeHtml(student.program)} · ${escapeHtml(student.id)}</option>`
  ).join("");
  const defaultDueDate = new Date();
  defaultDueDate.setDate(defaultDueDate.getDate() + 7);
  byId("plan-due-date").value = `${defaultDueDate.getFullYear()}-${String(defaultDueDate.getMonth() + 1).padStart(2, "0")}-${String(defaultDueDate.getDate()).padStart(2, "0")}`;
  byId("plan-form-status").hidden = true;
  byId("plan-form-status").textContent = "";
  byId("plan-backdrop").classList.add("open");
  byId("plan-title").focus();
}

function closePlanForm() {
  byId("plan-backdrop").classList.remove("open");
  byId("plan-form").reset();
  planStudentId = "";
  byId("plan-save-button").disabled = false;
  byId("plan-save-button").innerHTML = "Save plan <span>→</span>";
}

function showPlanFormError(error) {
  const status = byId("plan-form-status");
  status.textContent = error instanceof TypeError
    ? "Could not reach the server. Check your connection and try again."
    : error.message;
  status.hidden = false;
}

function render() {
  renderMetrics();
  renderRows();
  syncDirectoryControls();
  renderInterventions();
}

function renderTrend() {
  const selectedTrend = trendData[byId("trend-range").value];
  if (!selectedTrend) return;
  const roster = state.program === "all" ? students : students.filter((student) => student.program === state.program);
  if (roster.length === 0) return;
  const currentAverage = Math.round(roster.reduce((sum, student) => sum + student.score, 0) / roster.length);
  const currentAtRisk = roster.filter((student) => student.risk !== "On track").length;
  const scoreValues = selectedTrend.scoreOffsets.map((offset) => Math.max(0, Math.min(100, currentAverage + offset)));
  const riskValues = selectedTrend.riskOffsets.map((offset) => Math.max(0, Math.min(roster.length, currentAtRisk + offset)));
  const data = { labels: selectedTrend.labels, scores: scoreValues, atRisk: riskValues };
  const lastIndex = data.labels.length - 1;
  const scoreY = (score) => 16 + (100 - score) * (126 / 75);
  const riskY = (count) => 142 - count * (126 / 25);
  const x = (index) => (index / lastIndex) * 720;
  const scorePoints = data.scores.map((value, index) => ({ x: x(index), y: scoreY(value), value }));
  const riskPoints = data.atRisk.map((value, index) => ({ x: x(index), y: riskY(value), value }));
  const toPath = (points) => points.map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
  const scorePath = toPath(scorePoints);
  const lastScore = data.scores[lastIndex] - data.scores[0];
  const riskChange = data.atRisk[0] - data.atRisk[lastIndex];
  const riskText = `${Math.abs(riskChange)} ${riskChange >= 0 ? "fewer" : "more"}`;
  const changeText = `${lastScore >= 0 ? "+" : ""}${lastScore} pts · ${riskText} ${Math.abs(riskChange) === 1 ? "student" : "students"} at risk`;

  byId("score-area").setAttribute("d", `${scorePath} L720 165 L0 165Z`);
  byId("score-line").setAttribute("d", scorePath);
  byId("risk-line").setAttribute("d", toPath(riskPoints));
  byId("score-points").innerHTML = scorePoints.map((point, index) =>
    `<circle cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="4"><title>${data.labels[index]}: average success score ${point.value}</title></circle>`
  ).join("");
  byId("risk-points").innerHTML = riskPoints.map((point, index) =>
    `<circle cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="3.5"><title>${data.labels[index]}: ${point.value} students at risk</title></circle>`
  ).join("");
  byId("chart-labels").innerHTML = data.labels.map((label) => `<span>${label}</span>`).join("");
  byId("chart-context").textContent = changeText;
  byId("chart-context").classList.toggle("chart-negative", lastScore < 0 || riskChange < 0);
  byId("trend-chart").setAttribute(
    "aria-label",
    `${byId("trend-range").selectedOptions[0].text}: illustrative demo data, average success score changed from ${data.scores[0]} to ${data.scores[lastIndex]}, students at risk changed from ${data.atRisk[0]} to ${data.atRisk[lastIndex]}`
  );
}

function openStudent(id) {
  const student = students.find((item) => item.id === id);
  if (!student) return;
  const scoreClass = student.score < 50 ? "score-low" : student.score < 65 ? "score-mid" : "score-good";
  const riskClass = student.risk.toLowerCase().replace(" ", "-");
  const academics = academicSignal(student);
  const engagement = engagementSignal(student);
  const signals = [
    ["Academic performance", academics, weights.academic, `${student.cgpa.toFixed(1)} GPA · ${student.backlog} backlogs`],
    ["Attendance", student.attendance, weights.attendance, `${student.attendance}% of classes attended`],
    ["LMS activity", student.lms, weights.lms, `${student.lms}% activity index`],
    ["Engagement & skills", engagement, weights.engagement, `${student.engagement}% engagement · skills ${student.skills}/100`],
    ["Placement readiness", student.placement, weights.placement, `Aptitude & mock interview index: ${student.placement}/100`]
  ].map(([label, value, weight, detail]) => ({
    label, value, weight, detail, contribution: value * weight
  })).sort((first, second) => second.contribution - first.contribution);
  const sourceGroups = studentDataGroups(student);
  const reasons = riskReasons(student);
  byId("drawer-content").innerHTML = `
    <div class="drawer-kicker">STUDENT SNAPSHOT</div>
    <div class="drawer-profile"><span class="avatar avatar-drawer">${escapeHtml(initials(student.name))}</span><div><h2>${escapeHtml(student.name)}</h2><span>${escapeHtml(student.id)} · ${escapeHtml(student.year)}</span></div></div>
    <div class="drawer-program">${escapeHtml(student.program)} <button class="program-email-button" type="button" data-student-email="${escapeHtml(student.id)}" aria-label="Compose email to ${escapeHtml(student.name)}" title="Email student">✉</button></div>
    <div class="drawer-score-card"><div><span>Success score</span><span class="risk-badge ${riskClass}"><i></i>${escapeHtml(student.risk)} risk</span></div><div class="drawer-score-number ${scoreClass}">${student.score}<small>/ 100</small></div><p>${escapeHtml(student.keySignal)}</p></div>
    <div class="drawer-section-title">WHAT'S SHAPING THIS SCORE <span>Largest weighted contributions first</span></div>
    <div class="signal-breakdown">${signals.map(({ label, value, weight, detail, contribution }) => `<div class="signal-row"><div class="signal-label"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(detail)} · ${Math.round(weight * 100)}% weight</span></div><div class="signal-value">${contribution.toFixed(1)}<small> / 100 pts</small></div><div class="signal-track"><span style="width:${value}%;background:${value < 50 ? "#d87566" : value < 65 ? "#d6a74d" : "#4aa985"}"></span></div></div>`).join("")}</div>
    <section class="risk-explanation" aria-label="Risk flag explanation"><strong>Why this risk flag?</strong><ul>${reasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")}</ul></section>
    <div class="drawer-context"><div><span>Attendance</span><strong>${student.attendance}%</strong></div><div><span>CGPA</span><strong>${student.cgpa.toFixed(1)} / 4.0</strong></div><div><span>Backlogs</span><strong>${student.backlog}</strong></div><div><span>Feedback</span><strong>${student.satisfaction} / 5</strong></div></div>
    <div class="drawer-section-title source-data-title">INTEGRATED STUDENT DATA <span>Illustrative sample indicators</span></div>
    <div class="source-data-grid">${sourceGroups.map((group) => `<section class="source-data-group"><h3>${group.name}</h3><dl>${group.items.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}</dl></section>`).join("")}</div>
    <div class="drawer-note"><span>✳</span><p><strong>Suggested next step</strong><br>${student.risk === "High" ? "Schedule a supportive check-in and explore academic support options together." : student.placement < 50 ? "Invite them to a placement-readiness session or a skills coaching appointment." : student.attendance < 75 ? "Reach out privately to understand attendance barriers and connect them with support." : "Recognize their progress and agree on one small next goal together."}</p></div>
    <div class="drawer-actions"><button class="primary-button" id="log-intervention" data-id="${escapeHtml(student.id)}">＋ Log an intervention</button><button class="secondary-button" id="create-student-plan" data-id="${escapeHtml(student.id)}">＋ Follow-up plan</button><button class="secondary-button" id="email-student" data-email="${escapeHtml(student.email)}">✉ Send an email</button></div>
    <div class="drawer-last-check">Last check-in <strong>${escapeHtml(student.lastCheck)}</strong>${student.interventions.length ? `<span class="intervention-logged"> · ${student.interventions.length} intervention${student.interventions.length > 1 ? "s" : ""} logged</span>` : ""}</div>`;
  byId("student-drawer").classList.add("open");
  byId("drawer-backdrop").classList.add("open");
  byId("student-drawer").setAttribute("aria-hidden", "false");
  document.body.classList.add("drawer-open");
  byId("drawer-close").focus();
}

function closeDrawer() {
  byId("student-drawer").classList.remove("open");
  byId("drawer-backdrop").classList.remove("open");
  byId("student-drawer").setAttribute("aria-hidden", "true");
  document.body.classList.remove("drawer-open");
}

let toastTimer;
function showToast(message) {
  const toast = byId("toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3200);
}

function openMethodology() {
  byId("modal-backdrop").classList.add("open");
  byId("modal-done").focus();
}

function closeMethodology() {
  byId("modal-backdrop").classList.remove("open");
}

function openEmailComposer(student) {
  currentEmailStudentId = student.id;
  const isAttendanceConcern = student.attendance < 75;
  byId("email-to").value = student.email;
  byId("email-subject").value = isAttendanceConcern ? "Checking in about classes" : "Checking in — here to support you";
  byId("email-body").value = isAttendanceConcern
    ? `Hi ${student.name.split(" ")[0]},\n\nI noticed you haven't been able to make it to class as regularly lately, and I wanted to check in. Your attendance is currently at ${student.attendance}%.\n\nIf something is making it difficult to attend, please let me know. I'm here to listen and help connect you with support. Would you be available for a quick conversation this week?\n\nTake care,\nAlex Morgan\nAcademic Advisor`
    : `Hi ${student.name.split(" ")[0]},\n\nI wanted to check in and see how things are going this semester. Is there anything you would like to talk through or any support that would be helpful?\n\nLet me know if you would like to set up a time to chat.\n\nTake care,\nAlex Morgan\nAcademic Advisor`;
  byId("email-backdrop").classList.add("open");
  byId("email-send-status").hidden = true;
  byId("email-send-status").textContent = "";
  byId("email-to").focus();
}

function closeEmailComposer() {
  byId("email-backdrop").classList.remove("open");
  currentEmailStudentId = null;
  byId("email-send-button").disabled = false;
  byId("email-send-button").innerHTML = "Send email <span>→</span>";
}

function closeEmailConfirmation() {
  byId("email-sent-backdrop").classList.remove("open");
}

function exportCsv() {
  const data = getFilteredStudents();
  const headers = [
    "Student ID", "Name", "Program", "Year", "Success Score", "Risk",
    "CGPA", "Average marks %", "Backlogs", "Subject performance",
    "Attendance %", "Subject-wise attendance",
    "LMS logins per week", "LMS assignment completion %", "LMS activity index",
    "Events attended", "Club participation", "Hackathons", "Certifications",
    "Aptitude assessment", "Coding assessment", "Domain skills assessment", "Pathway-specific assessment", "Suggested entry-level placements", "Mock interviews",
    "Discipline skills assessment", "Transferable-skills assessment", "Career & transferable skills",
    "Student satisfaction", "Faculty feedback", "Key signal"
  ];
  const lines = data.map((student) => {
    const groups = studentDataGroups(student);
    const metrics = Object.fromEntries(groups.flatMap((group) => group.items));
    return [
      student.id, student.name, student.program, student.year, student.score, student.risk,
      metrics.CGPA, metrics["Average marks"], metrics.Backlogs, metrics["Subject performance"],
      metrics["Overall attendance"], metrics["Subject-wise attendance"],
      metrics["Logins per week"], metrics["Assignment completion"], metrics["Activity index"],
      metrics["Events attended"], metrics["Club participation"], metrics.Hackathons, metrics.Certifications,
      metrics["Aptitude assessment"], metrics["Coding assessment"], metrics["Domain skills assessment"],
      metrics["Pathway-specific assessment"], metrics["Suggested entry-level placements"], metrics["Mock interviews"],
      metrics["Discipline skills assessment"], metrics["Transferable-skills assessment"],
      groups.find((group) => group.name === "Career & transferable skills").items
        .filter(([label]) => !["Discipline skills assessment", "Transferable-skills assessment", "Combined skills index"].includes(label))
        .map(([label, value]) => `${label}: ${value}`).join("; "),
      metrics["Student satisfaction"], metrics["Faculty feedback"], student.keySignal
    ];
  });
  const csv = [headers, ...lines].map((row) => row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(",")).join("\r\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  link.download = "student-success-analytics.csv";
  link.click();
  URL.revokeObjectURL(link.href);
  showToast(`Exported ${data.length} student records`);
}

byId("student-rows").addEventListener("click", (event) => {
  const target = event.target.closest("[data-open-student], [data-student-action]");
  if (target) openStudent(target.dataset.openStudent || target.dataset.studentAction);
});

byId("student-search").addEventListener("input", (event) => {
  state.search = event.target.value;
  state.page = 1;
  renderRows();
  syncDirectoryControls();
});

byId("year-filter").addEventListener("change", (event) => {
  state.year = event.target.value;
  state.page = 1;
  renderRows();
  syncDirectoryControls();
});

byId("score-filter").addEventListener("change", (event) => {
  state.scoreRange = event.target.value;
  state.page = 1;
  renderRows();
  syncDirectoryControls();
});

byId("program-filter").addEventListener("change", (event) => {
  state.program = event.target.value;
  state.page = 1;
  render();
  renderTrend();
});
byId("trend-range").addEventListener("change", renderTrend);

document.querySelectorAll(".table-tab").forEach((tab) => tab.addEventListener("click", () => {
  applyDirectoryFilter({ risk: tab.dataset.risk === "all" ? "all" : tab.dataset.risk });
}));

document.querySelectorAll(".focus-item").forEach((item) => item.addEventListener("click", () => {
  applyDirectoryFilter({ focus: state.focus === item.dataset.focus ? "" : item.dataset.focus });
}));

byId("decision-insights").addEventListener("click", (event) => {
  const action = event.target.closest("[data-decision-focus]");
  if (action && !action.disabled) {
    applyDirectoryFilter({ focus: action.dataset.decisionFocus, resetCohortFilters: true });
  }
});

function clearFilters(event) {
  if (event) event.preventDefault();
  state.risk = "all";
  state.search = "";
  state.program = "all";
  state.focus = "";
  state.year = "all";
  state.scoreRange = "all";
  state.page = 1;
  byId("student-search").value = "";
  byId("program-filter").value = "all";
  byId("year-filter").value = "all";
  byId("score-filter").value = "all";
  syncDirectoryControls();
  render();
  renderTrend();
}
byId("clear-filters").addEventListener("click", clearFilters);
byId("empty-clear").addEventListener("click", clearFilters);

byId("prev-page").addEventListener("click", () => { state.page--; renderRows(); });
byId("next-page").addEventListener("click", () => { state.page++; renderRows(); });
byId("view-priority").addEventListener("click", () => {
  applyDirectoryFilter({ focus: "priority" });
});
document.querySelectorAll(".metric-drilldown[data-metric-action]").forEach((card) => {
  const activate = () => {
    const action = card.dataset.metricAction;
    if (action === "all") {
      applyDirectoryFilter();
    } else if (action === "low-score") {
      applyDirectoryFilter({ focus: "low-score" });
    } else if (action === "priority") {
      applyDirectoryFilter({ focus: "priority" });
    } else if (action === "interventions") {
      byId("interventions").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  card.addEventListener("click", activate);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activate();
    }
  });
});
byId("show-segments").addEventListener("click", () => {
  byId("students").scrollIntoView({ behavior: "smooth", block: "start" });
  byId("announcement").textContent = "Select a student segment above the student list to filter.";
});
byId("export-button").addEventListener("click", exportCsv);
byId("profile-button").addEventListener("click", openStaffProfile);
byId("profile-menu-button").addEventListener("click", openStaffProfile);
byId("top-profile-button").addEventListener("click", openStaffProfile);
byId("profile-close").addEventListener("click", closeStaffProfile);
byId("profile-backdrop").addEventListener("click", (event) => {
  if (event.target === byId("profile-backdrop")) closeStaffProfile();
});
byId("signout-button").addEventListener("click", async () => {
  const button = byId("signout-button");
  const status = byId("profile-auth-status");
  button.disabled = true;
  status.hidden = true;
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: "{}"
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not sign out.");
    window.location.replace("auth.html");
  } catch (error) {
    status.textContent = error instanceof TypeError
      ? "Could not reach the authentication server. Your session is still active."
      : error.message;
    status.hidden = false;
  } finally {
    button.disabled = false;
  }
});
byId("drawer-close").addEventListener("click", closeDrawer);
byId("drawer-backdrop").addEventListener("click", closeDrawer);
byId("methodology-button").addEventListener("click", openMethodology);
byId("modal-close").addEventListener("click", closeMethodology);
byId("modal-done").addEventListener("click", closeMethodology);
byId("modal-backdrop").addEventListener("click", (event) => { if (event.target === byId("modal-backdrop")) closeMethodology(); });
byId("email-close").addEventListener("click", closeEmailComposer);
byId("email-cancel").addEventListener("click", closeEmailComposer);
byId("email-backdrop").addEventListener("click", (event) => { if (event.target === byId("email-backdrop")) closeEmailComposer(); });
byId("email-sent-done").addEventListener("click", closeEmailConfirmation);
byId("email-sent-backdrop").addEventListener("click", (event) => { if (event.target === byId("email-sent-backdrop")) closeEmailConfirmation(); });
byId("email-compose-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const student = students.find((item) => item.id === currentEmailStudentId);
  if (!student) {
    showToast("Could not find the selected student. Close this form and try again.");
    return;
  }
  sendStudentEmail(student);
});

async function sendStudentEmail(student) {
  const button = byId("email-send-button");
  const status = byId("email-send-status");
  button.disabled = true;
  button.textContent = "Sending…";
  status.hidden = true;
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: student.id,
        to: byId("email-to").value.trim(),
        subject: byId("email-subject").value.trim(),
        text: byId("email-body").value
      })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "The email service could not send this message.");

    const now = new Date();
    emailActivityLog.unshift({
      studentName: student.name,
      to: byId("email-to").value.trim(),
      subject: byId("email-subject").value.trim(),
      providerId: result.id,
      createdAt: now.getTime(),
      time: new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(now)
    });
    renderInterventions();
    const recipient = byId("email-to").value.trim();
    closeEmailComposer();
    byId("email-sent-recipient").textContent = `Your message to ${student.name} (${recipient}) was accepted by the email service.`;
    byId("email-sent-backdrop").classList.add("open");
    byId("email-sent-done").focus();
  } catch (error) {
    status.textContent = error instanceof TypeError
      ? "Could not reach the mail server. Start the app with its server command and try again."
      : error.message;
    status.hidden = false;
  } finally {
    if (byId("email-backdrop").classList.contains("open")) {
      button.disabled = false;
      button.innerHTML = "Send email <span>→</span>";
    }
  }
}

byId("drawer-content").addEventListener("click", (event) => {
  const logButton = event.target.closest("#log-intervention");
  const planButton = event.target.closest("#create-student-plan");
  const emailButton = event.target.closest("#email-student, [data-student-email]");
  if (logButton) {
    const student = students.find((item) => item.id === logButton.dataset.id);
    student.interventions.push({ date: new Date().toISOString(), type: "Advisor check-in" });
    student.lastCheck = "Just now";
    const now = new Date();
    interventionLog.unshift({
      studentName: student.name,
      createdAt: now.getTime(),
      time: new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(now)
    });
    byId("metric-interventions").textContent = String(Number(byId("metric-interventions").textContent) + 1);
    renderInterventions();
    openStudent(student.id);
    showToast(`Intervention logged for ${student.name}`);
  }
  if (planButton) openPlanForm(planButton.dataset.id);
  if (emailButton) {
    const student = students.find((item) =>
      emailButton.dataset.studentEmail
        ? item.id === emailButton.dataset.studentEmail
        : item.email === emailButton.dataset.email
    );
    if (student) openEmailComposer(student);
  }
});

byId("create-plan-button").addEventListener("click", () => openPlanForm());
byId("plan-close").addEventListener("click", closePlanForm);
byId("plan-cancel").addEventListener("click", closePlanForm);
byId("plan-backdrop").addEventListener("click", (event) => {
  if (event.target === byId("plan-backdrop")) closePlanForm();
});
byId("plan-filter").addEventListener("change", renderInterventionPlans);
byId("plans-list").addEventListener("click", (event) => {
  const studentLink = event.target.closest("[data-plan-student]");
  if (studentLink) openStudent(studentLink.dataset.planStudent);
});
byId("plans-list").addEventListener("change", async (event) => {
  const statusSelect = event.target.closest("[data-plan-status]");
  if (!statusSelect) return;
  statusSelect.disabled = true;
  const plan = interventionPlans.find((item) => item.id === statusSelect.dataset.planStatus);
  const previousStatus = plan?.status;
  try {
    const response = await fetch(`/api/intervention-plans/${encodeURIComponent(statusSelect.dataset.planStatus)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ status: statusSelect.value })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not update intervention plan.");
    if (plan) Object.assign(plan, result.plan);
    renderInterventionPlans();
    showToast("Intervention plan status updated");
  } catch (error) {
    if (plan) plan.status = previousStatus;
    renderInterventionPlans();
    byId("plans-status").textContent = error instanceof TypeError
      ? "Could not reach the server to update this plan."
      : error.message;
    byId("plans-status").hidden = false;
  }
});
byId("plan-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const student = students.find((item) => item.id === byId("plan-student").value);
  if (!student) {
    showPlanFormError(new Error("Select a valid student."));
    return;
  }
  const button = byId("plan-save-button");
  button.disabled = true;
  button.textContent = "Saving…";
  byId("plan-form-status").hidden = true;
  try {
    const response = await fetch("/api/intervention-plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({
        studentId: student.id,
        studentName: student.name,
        title: byId("plan-title").value,
        description: byId("plan-description").value,
        dueDate: byId("plan-due-date").value
      })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not save intervention plan.");
    interventionPlans.push(result.plan);
    renderInterventionPlans();
    closePlanForm();
    byId("intervention-plans").scrollIntoView({ behavior: "smooth", block: "start" });
    showToast(`Follow-up plan saved for ${student.name}`);
  } catch (error) {
    showPlanFormError(error);
  } finally {
    if (byId("plan-backdrop").classList.contains("open")) {
      button.disabled = false;
      button.innerHTML = "Save plan <span>→</span>";
    }
  }
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    byId("student-search").focus();
  }
  if (event.key === "Escape") {
    if (byId("email-sent-backdrop").classList.contains("open")) closeEmailConfirmation();
    else if (byId("email-backdrop").classList.contains("open")) closeEmailComposer();
    else if (byId("plan-backdrop").classList.contains("open")) closePlanForm();
    else if (byId("modal-backdrop").classList.contains("open")) closeMethodology();
    else if (byId("profile-backdrop").classList.contains("open")) closeStaffProfile();
    else closeDrawer();
  }
});

render();
renderTrend();
loadInterventionPlans();
if (window.smartCampusStaff) {
  updateStaffIdentity(window.smartCampusStaff);
} else {
  fetch("/api/auth/session", { cache: "no-store", credentials: "same-origin" })
    .then((response) => {
      if (!response.ok) throw new Error("Could not load the staff profile.");
      return response.json();
    })
    .then(({ user }) => {
      window.smartCampusStaff = user;
      updateStaffIdentity(user);
    })
    .catch((error) => console.error("Could not load the authenticated staff profile.", error));
}
