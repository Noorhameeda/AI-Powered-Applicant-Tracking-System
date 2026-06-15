const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const requiredFiles = ["index.html", "styles.css", "script.js"];
const requiredSections = ["overview", "roles", "workflows", "ai", "architecture", "delivery"];

for (const file of requiredFiles) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing required frontend file: ${file}`);
  }
}

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");

for (const section of requiredSections) {
  if (!js.includes(`"${section}"`) && !js.includes(`'${section}'`)) {
    throw new Error(`Missing section route in script.js: ${section}`);
  }
}

if (!html.includes('<div id="app"></div>')) {
  throw new Error("index.html must include the app mount point");
}

if (!css.includes("@media (max-width: 760px)")) {
  throw new Error("styles.css must include mobile responsive rules");
}

if (!js.includes("Score = (Skills x 0.40)")) {
  throw new Error("AI scoring formula is missing");
}

console.log("Frontend checks passed");
