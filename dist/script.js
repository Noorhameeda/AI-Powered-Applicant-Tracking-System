const state = {
  activeRole: "recruiter",
  jobs: [
    {
      title: "Senior Frontend Engineer",
      department: "Product Engineering",
      type: "Full-time",
      location: "Remote",
      status: "Open",
      requirements: ["React", "TypeScript", "Design systems", "Testing"]
    },
    {
      title: "AI Platform Analyst",
      department: "Talent Intelligence",
      type: "Contract",
      location: "Bengaluru",
      status: "Shortlisting",
      requirements: ["Prompting", "Data analysis", "ATS workflows", "SQL"]
    }
  ],
  applicants: [
    {
      name: "Aarav Sharma",
      role: "Senior Frontend Engineer",
      score: 94,
      status: "Interview",
      strengths: ["React", "Accessibility", "Design systems"],
      gaps: ["GraphQL depth"]
    },
    {
      name: "Meera Iyer",
      role: "AI Platform Analyst",
      score: 89,
      status: "Shortlisted",
      strengths: ["Gemini API", "SQL", "Recruiting analytics"],
      gaps: ["AWS S3"]
    },
    {
      name: "Daniel Thomas",
      role: "Senior Frontend Engineer",
      score: 81,
      status: "Review",
      strengths: ["Testing", "Performance", "Node.js"],
      gaps: ["Design systems"]
    }
  ]
};

const roles = [
  {
    id: "admin",
    icon: "AD",
    title: "Administrator",
    summary: "Controls platform configuration, user access, analytics, and audit visibility.",
    features: ["User management CRUD", "Role assignment", "System analytics", "Activity monitoring", "Platform configuration"]
  },
  {
    id: "recruiter",
    icon: "RC",
    title: "Recruiter",
    summary: "Creates jobs, reviews AI rankings, manages pipelines, and sends candidate updates.",
    features: ["Job post management", "AI candidate ranking", "Application pipeline", "Interview scheduling", "Email notifications"]
  },
  {
    id: "applicant",
    icon: "AP",
    title: "Applicant",
    summary: "Browses roles, uploads a resume, applies to positions, and tracks progress.",
    features: ["Job browsing", "PDF resume upload", "One-click applications", "Application status tracking", "Notifications"]
  }
];

const apiRows = [
  ["Auth", "/api/auth/register", "POST", "Public", "Create new user account"],
  ["Auth", "/api/auth/login", "POST", "Public", "Login with credentials"],
  ["Jobs", "/api/jobs", "GET/POST", "Any/Recruiter", "List and create job posts"],
  ["Jobs", "/api/jobs/:id", "GET/PUT/DEL", "Any/Recruiter", "Job CRUD operations"],
  ["Applications", "/api/applications", "GET/POST", "Any/Applicant", "List and submit applications"],
  ["Applications", "/api/applications/:id", "GET/PUT", "Any/Recruiter", "Details and status updates"],
  ["AI", "/api/ai/analyze", "POST", "Recruiter", "Analyze resume against job"],
  ["AI", "/api/ai/rank", "GET", "Recruiter", "Rank candidates by score"],
  ["Resume", "/api/resumes/upload", "POST", "Applicant", "Upload validated PDF resume"],
  ["Notifications", "/api/notifications", "GET/PATCH", "Any", "Read and mark alerts"],
  ["Emails", "/api/emails/send", "POST", "Recruiter", "Send templated email"]
];

const securityRows = [
  ["Authentication", "JWT", "Access token with 15 minute expiry plus refresh token in httpOnly cookies"],
  ["Password", "bcrypt", "12 salt rounds with one-way hashes only"],
  ["HTTP Headers", "Helmet.js", "HSTS, X-Frame-Options, CSP, XSS protection"],
  ["Rate Limiting", "express-rate-limit", "100 requests per 15 minutes per IP and tighter login limits"],
  ["Input Validation", "Joi", "Schema validation and sanitization on every API input"],
  ["File Uploads", "S3 + MIME checks", "PDF-only uploads with 5 MB limit and presigned URLs"]
];

const databaseRows = [
  ["Users", "email, password, role, isActive", "Authentication and RBAC", "email unique, role"],
  ["Jobs", "title, dept, type, status, postedBy", "Job posting management", "status + createdAt"],
  ["Applications", "jobId, applicantId, status, aiScore", "Candidate applications", "jobId + applicantId unique"],
  ["Resumes", "userId, fileUrl, s3Key, extractedText", "Resume storage metadata", "userId"],
  ["AIAnalysis", "applicationId, overallScore, skillGaps", "AI scoring results", "overallScore desc"],
  ["Notifications", "userId, type, isRead, createdAt", "User notifications", "userId + isRead"],
  ["Emails", "to, subject, template, status", "Delivery tracking", "status + sentAt"],
  ["ActivityLogs", "userId, action, entity, timestamp", "Audit trail", "timestamp desc"]
];

const timeline = [
  ["Week 1: Foundation", ["GitHub repo setup", "MongoDB schemas", "AWS S3 bucket", "React project init", "Gemini API testing", "Auth scaffold"]],
  ["Week 2: Core Features", ["JWT auth complete", "Job CRUD + search", "Resume upload to S3", "AI scoring engine", "RBAC middleware", "Applications"]],
  ["Week 3: Integration", ["Email notifications", "Nodemailer setup", "AI prompt tuning", "Responsive UI polish", "Error handling", "Integration tests"]],
  ["Week 4: Deploy", ["E2E tests", "Security audit", "Performance testing", "Vercel deployment", "Render deployment", "Smoke test"]]
];

function el(tag, className, content) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
}

function createButton(label, onClick, className = "") {
  const button = el("button", className, label);
  button.type = "button";
  button.addEventListener("click", onClick);
  return button;
}

function renderList(items) {
  const list = el("ul", "clean-list");
  items.forEach((item) => list.append(el("li", "", item)));
  return list;
}

function renderTopbar() {
  const topbar = el("header", "topbar");
  const brand = el("div", "brand");
  brand.append(el("span", "brand-mark", "ATS"), el("span", "", "AI Powered Applicant Tracking"));

  const nav = el("nav", "nav");
  [
    ["Overview", "overview"],
    ["Roles", "roles"],
    ["Workflows", "workflows"],
    ["AI Engine", "ai"],
    ["Architecture", "architecture"],
    ["Delivery", "delivery"]
  ].forEach(([label, id], index) => {
    const button = createButton(label, () => document.getElementById(id).scrollIntoView());
    if (index === 0) button.classList.add("active");
    nav.append(button);
  });

  const actions = el("div", "top-actions");
  actions.append(el("button", "icon-button", "Go"), el("button", "icon-button", "Nav"));
  topbar.append(brand, nav, actions);
  return topbar;
}

function renderHero() {
  const hero = el("section", "hero");
  hero.id = "overview";

  const copy = el("div", "hero-copy");
  copy.append(
    el("p", "eyebrow", "AI Resume Screening + ATS Operations"),
    el("h1", "", "AI Powered Applicant Tracking System"),
    el("p", "", "A complete frontend prototype for administrators, recruiters, and applicants with weighted AI ranking, role-based access, job workflows, and production architecture views.")
  );

  const actions = el("div", "hero-actions");
  actions.append(
    createButton("Review rankings", () => document.getElementById("workflows").scrollIntoView(), "primary-button"),
    createButton("See AI formula", () => document.getElementById("ai").scrollIntoView(), "secondary-button")
  );
  copy.append(actions);

  const metrics = el("div", "metric-strip");
  [
    ["83%", "Screening time reduction"],
    ["70%", "Faster shortlist"],
    ["25+", "REST API endpoints"],
    ["8", "Indexed collections"]
  ].forEach(([value, label]) => {
    const metric = el("div", "metric");
    metric.append(el("strong", "", value), el("span", "", label));
    metrics.append(metric);
  });
  copy.append(metrics);

  hero.append(copy, renderWorkspacePreview());
  return hero;
}

function renderWorkspacePreview() {
  const workspace = el("div", "workspace");
  const header = el("div", "workspace-header");
  const title = el("div", "workspace-title");
  title.append(el("strong", "", "Recruiter Command Center"), el("span", "", "Live candidate ranking for Senior Frontend Engineer"));
  header.append(title, el("span", "status-pill", "AI Analysis Complete"));

  const grid = el("div", "workspace-grid");
  const pipeline = el("div", "pipeline-panel");
  const heading = el("div", "panel-heading");
  heading.append(el("h2", "", "AI Pipeline"), el("span", "muted", "6 steps"));
  pipeline.append(heading);
  ["Parse PDF resume", "Extract skills and education", "Match against requirements", "Score weighted dimensions", "Rank candidates", "Summarize gaps"].forEach((step, index) => {
    const row = el("div", "pipeline-step");
    row.append(el("span", "step-index", String(index + 1)));
    const copy = el("div");
    copy.append(el("strong", "", step), el("span", "", "Automated and stored for recruiter review."));
    row.append(copy);
    pipeline.append(row);
  });

  const ranking = el("div", "ranking-panel");
  ranking.append(el("div", "panel-heading"));
  ranking.querySelector(".panel-heading").append(el("h2", "", "Top Matches"), el("span", "muted", "Sorted by score"));
  ranking.append(renderRankingTable());
  grid.append(pipeline, ranking);
  workspace.append(header, grid);
  return workspace;
}

function renderRankingTable() {
  const table = el("table", "ranking-table");
  table.innerHTML = "<thead><tr><th>Candidate</th><th>Score</th><th>Status</th><th>Strengths</th></tr></thead>";
  const body = el("tbody");
  state.applicants.forEach((candidate) => {
    const row = el("tr");
    row.append(el("td", "", candidate.name), el("td", "score-cell", String(candidate.score)), el("td", "", candidate.status));
    const tags = el("td", "tag-row");
    candidate.strengths.forEach((skill) => tags.append(el("span", "tag", skill)));
    row.append(tags);
    body.append(row);
  });
  table.append(body);
  return table;
}

function renderSectionHeading(title, description) {
  const wrap = el("div", "section-heading");
  const left = el("div");
  left.append(el("h2", "", title), el("div", "accent-line"));
  wrap.append(left, el("p", "", description));
  return wrap;
}

function renderRoles() {
  const section = el("section", "section");
  section.id = "roles";
  section.append(renderSectionHeading("Three Users, One Platform", "Role-based access keeps administrators, recruiters, and applicants focused on the tools they are allowed to use."));
  const grid = el("div", "role-grid");
  roles.forEach((role) => {
    const card = el("article", "role-card");
    card.append(el("div", "role-icon", role.icon), el("h3", "", role.title), el("p", "muted", role.summary), renderList(role.features));
    grid.append(card);
  });
  section.append(grid);
  return section;
}

function renderWorkflows() {
  const section = el("section", "section");
  section.id = "workflows";
  section.append(renderSectionHeading("Operational Workflows", "Create jobs, upload resume data, and view AI-ranked candidates without needing a backend connection."));

  const tabs = el("div", "tabs");
  roles.forEach((role) => {
    const button = createButton(role.title, () => {
      state.activeRole = role.id;
      render();
      document.getElementById("workflows").scrollIntoView();
    });
    if (state.activeRole === role.id) button.classList.add("active");
    tabs.append(button);
  });

  const grid = el("div", "workflow-grid");
  grid.append(renderRoleForm(), renderRoleOutput());
  section.append(tabs, grid);
  return section;
}

function renderRoleForm() {
  const panel = el("div", "panel");
  if (state.activeRole === "recruiter") {
    panel.append(el("h3", "", "Create job post"));
    const form = el("form", "field-grid");
    [
      ["Job title", "Senior Frontend Engineer"],
      ["Department", "Product Engineering"],
      ["Location", "Remote"],
      ["Employment type", "Full-time"]
    ].forEach(([label, value]) => {
      const field = el("div", "field");
      field.append(el("label", "", label));
      const input = el("input");
      input.value = value;
      field.append(input);
      form.append(field);
    });
    const desc = el("div", "field full");
    desc.append(el("label", "", "Required skills"));
    const textarea = el("textarea");
    textarea.value = "React, TypeScript, accessibility, design systems, automated testing";
    desc.append(textarea);
    form.append(desc);
    panel.append(form, createButton("Generate AI shortlist", () => alert("Shortlist refreshed using the weighted scoring model."), "primary-button"));
  } else if (state.activeRole === "applicant") {
    panel.append(el("h3", "", "Apply to a role"));
    const form = el("form", "field-grid");
    ["Full name", "Email", "Portfolio URL", "Resume PDF"].forEach((label) => {
      const field = el("div", "field");
      field.append(el("label", "", label));
      const input = el("input");
      input.placeholder = label === "Resume PDF" ? "resume.pdf" : "";
      field.append(input);
      form.append(field);
    });
    panel.append(form, createButton("Submit application", () => alert("Application saved locally for demo."), "primary-button"));
  } else {
    panel.append(el("h3", "", "Admin controls"));
    const form = el("form", "field-grid");
    ["User role", "Account status", "Rate limit profile", "Audit scope"].forEach((label) => {
      const field = el("div", "field");
      field.append(el("label", "", label));
      const select = el("select");
      ["Enabled", "Restricted", "Review required"].forEach((option) => select.append(el("option", "", option)));
      field.append(select);
      form.append(field);
    });
    panel.append(form, createButton("Save access policy", () => alert("Policy updated for demo."), "primary-button"));
  }
  return panel;
}

function renderRoleOutput() {
  const panel = el("div", "panel");
  if (state.activeRole === "recruiter") {
    panel.append(el("h3", "", "Ranked candidates"));
    const list = el("div", "candidate-list");
    state.applicants.forEach((candidate) => list.append(renderCandidateCard(candidate)));
    panel.append(list);
  } else if (state.activeRole === "applicant") {
    panel.append(el("h3", "", "Open jobs"));
    const list = el("div", "job-list");
    state.jobs.forEach((job) => list.append(renderJobCard(job)));
    panel.append(list);
  } else {
    panel.append(el("h3", "", "System analytics"));
    const grid = el("div", "analytics-grid");
    [["1,248", "Total applicants"], ["312", "Active jobs"], ["96.4%", "API uptime"], ["18", "Blocked risky requests"]].forEach(([value, label]) => {
      const metric = el("div", "metric");
      metric.append(el("strong", "", value), el("span", "", label));
      grid.append(metric);
    });
    panel.append(grid);
  }
  return panel;
}

function renderCandidateCard(candidate) {
  const card = el("article", "candidate-card");
  const copy = el("div");
  copy.append(el("h3", "", candidate.name), el("p", "muted", `${candidate.role} - ${candidate.status}`));
  const tags = el("div", "tag-row");
  candidate.strengths.concat(candidate.gaps.map((gap) => `Gap: ${gap}`)).forEach((tag) => tags.append(el("span", "tag", tag)));
  copy.append(tags);
  card.append(copy, el("div", "candidate-score", String(candidate.score)));
  return card;
}

function renderJobCard(job) {
  const card = el("article", "job-card");
  card.append(el("h3", "", job.title));
  const meta = el("div", "card-meta");
  [job.department, job.type, job.location, job.status].forEach((item) => meta.append(el("span", "", item)));
  const tags = el("div", "tag-row");
  job.requirements.forEach((tag) => tags.append(el("span", "tag", tag)));
  card.append(meta, tags);
  return card;
}

function renderAiEngine() {
  const section = el("section", "section dark-band");
  section.id = "ai";
  section.append(renderSectionHeading("AI Scoring Engine", "Weighted matching ranks candidates across skills, experience, education, and projects."));
  const grid = el("div", "weights-grid");
  [
    ["40%", "Skills Match", "Technical and soft skills alignment against job requirements"],
    ["30%", "Experience Match", "Years and relevance of professional experience"],
    ["15%", "Education Match", "Degree level and field relevance"],
    ["15%", "Projects Match", "Portfolio relevance and demonstrated complexity"]
  ].forEach(([weight, title, copy]) => {
    const card = el("article", "weight-card");
    card.append(el("strong", "", weight), el("h3", "", title), el("p", "muted", copy));
    grid.append(card);
  });
  section.append(grid, el("div", "formula", "Score = (Skills x 0.40) + (Experience x 0.30) + (Education x 0.15) + (Projects x 0.15)"));
  return section;
}

function renderArchitecture() {
  const section = el("section", "section");
  section.id = "architecture";
  section.append(renderSectionHeading("Architecture And Governance", "The frontend mirrors the planned REST, MongoDB, and security layers so the product story is complete."));
  const cols = el("div", "two-col");
  cols.append(renderDataTable("API Domains", ["Domain", "Endpoint", "Method", "Auth", "Description"], apiRows));
  cols.append(renderDataTable("Security Layers", ["Layer", "Technology", "Implementation"], securityRows));
  section.append(cols);
  section.append(renderDataTable("MongoDB Collections", ["Collection", "Key Fields", "Purpose", "Indexes"], databaseRows));
  return section;
}

function renderDataTable(title, headers, rows) {
  const panel = el("div", "panel");
  panel.append(el("h3", "", title));
  const scroller = el("div", "api-layout");
  const table = el("table", "data-table");
  const head = el("thead");
  const headRow = el("tr");
  headers.forEach((header) => headRow.append(el("th", "", header)));
  head.append(headRow);
  const body = el("tbody");
  rows.forEach((row) => {
    const tr = el("tr");
    row.forEach((cell) => tr.append(el("td", "", cell)));
    body.append(tr);
  });
  table.append(head, body);
  scroller.append(table);
  panel.append(scroller);
  return panel;
}

function renderDelivery() {
  const section = el("section", "section");
  section.id = "delivery";
  section.append(renderSectionHeading("Delivery Plan", "A four-week path takes the ATS from foundation to deployed production smoke tests."));
  const line = el("div", "timeline");
  timeline.forEach(([week, items]) => {
    const item = el("article", "timeline-item");
    item.append(el("div", "week-dot"), el("h3", "", week), renderList(items));
    line.append(item);
  });
  section.append(line);
  const deploy = el("div", "deploy-grid");
  [
    ["Frontend", "Vercel Edge Network, global CDN, preview deployments"],
    ["Backend", "Render.com, Node.js Express APIs, environment variables"],
    ["Database", "MongoDB Atlas M10 cluster, backups, connection pooling"],
    ["Storage", "AWS S3 encrypted PDF resume storage with presigned URLs"],
    ["AI", "Google Gemini structured output with cached analysis results"],
    ["CI/CD", "GitHub Actions lint, test, build, deploy, smoke tests"]
  ].forEach(([title, copy]) => {
    const panel = el("div", "panel");
    panel.append(el("h3", "", title), el("p", "muted", copy));
    deploy.append(panel);
  });
  section.append(deploy);
  return section;
}

function renderFooter() {
  const footer = el("footer", "footer");
  footer.append(el("span", "", "AI Powered Applicant Tracking System"), el("strong", "", "Frontend complete and ready for backend integration"));
  return footer;
}

function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";
  const shell = el("div", "app-shell");
  shell.append(renderTopbar(), renderHero(), renderRoles(), renderWorkflows(), renderAiEngine(), renderArchitecture(), renderDelivery(), renderFooter());
  app.append(shell);
}

render();
