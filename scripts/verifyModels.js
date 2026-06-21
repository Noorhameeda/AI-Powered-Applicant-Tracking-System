const assert = require("assert");

const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");
const Resume = require("../models/Resume");
const AIAnalysis = require("../models/AIAnalysis");
const Notification = require("../models/Notification");
const ActivityLog = require("../models/ActivityLog");

const models = {
  User,
  Job,
  Application,
  Resume,
  AIAnalysis,
  Notification,
  ActivityLog,
};

const hasIndex = (model, fieldName) => {
  return model.schema.indexes().some(([definition]) => Object.prototype.hasOwnProperty.call(definition, fieldName));
};

const refFor = (model, pathName) => model.schema.path(pathName)?.options?.ref;

assert.deepEqual(Object.keys(models), [
  "User",
  "Job",
  "Application",
  "Resume",
  "AIAnalysis",
  "Notification",
  "ActivityLog",
]);

assert.equal(refFor(Job, "recruiterId"), "User");
assert.equal(refFor(Application, "applicantId"), "User");
assert.equal(refFor(Application, "jobId"), "Job");
assert.equal(refFor(Resume, "applicantId"), "User");
assert.equal(refFor(AIAnalysis, "applicationId"), "Application");
assert.equal(refFor(Notification, "userId"), "User");
assert.equal(refFor(ActivityLog, "userId"), "User");

assert.ok(User.schema.virtuals.jobs);
assert.ok(User.schema.virtuals.applications);
assert.ok(User.schema.virtuals.resumes);
assert.ok(Application.schema.virtuals.aiAnalysis);

assert.ok(hasIndex(User, "email"));
assert.ok(hasIndex(Job, "title"));
assert.ok(hasIndex(Job, "skills"));
assert.ok(hasIndex(Job, "location"));

console.log("Verified 7 ATS models, references, virtual relations, and indexes");
