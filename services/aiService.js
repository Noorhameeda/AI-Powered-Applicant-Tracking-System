const { GoogleGenerativeAI } = require("@google/generative-ai");

const DEFAULT_ANALYSIS = {
  score: 72,
  summary: "Candidate appears to match several role requirements. Add a Gemini API key for deeper analysis.",
  matchedSkills: [],
  missingSkills: [],
  strengths: ["Relevant resume content available", "Profile can be compared against job requirements"],
  weaknesses: ["AI provider is not configured", "Analysis is based on local fallback rules"],
};

const extractJson = (text) => {
  const cleaned = text.replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error("Gemini response did not include JSON");
  }

  return JSON.parse(cleaned.slice(start, end + 1));
};

const normalizeList = (value) => (Array.isArray(value) ? value.filter(Boolean).map(String) : []);

const normalizeAnalysis = (analysis) => ({
  score: Math.max(0, Math.min(100, Number(analysis.score) || 0)),
  summary: String(analysis.summary || DEFAULT_ANALYSIS.summary),
  matchedSkills: normalizeList(analysis.matchedSkills),
  missingSkills: normalizeList(analysis.missingSkills),
  strengths: normalizeList(analysis.strengths),
  weaknesses: normalizeList(analysis.weaknesses),
});

const generateFallbackAnalysis = ({ resumeText = "", requiredSkills = [] }) => {
  const resume = resumeText.toLowerCase();
  const skills = Array.isArray(requiredSkills) ? requiredSkills : [];
  const matchedSkills = skills.filter((skill) => resume.includes(String(skill).toLowerCase()));
  const missingSkills = skills.filter((skill) => !matchedSkills.includes(skill));
  const score = generateMatchScore(matchedSkills, missingSkills);

  return {
    ...DEFAULT_ANALYSIS,
    score,
    matchedSkills,
    missingSkills,
    strengths: matchedSkills.length ? [`Matches ${matchedSkills.length} required skills`] : DEFAULT_ANALYSIS.strengths,
    weaknesses: missingSkills.length ? [`Missing ${missingSkills.length} required skills`] : [],
  };
};

const analyzeResume = async ({ resumeText = "", jobDescription = "", requiredSkills = [] }) => {
  if (!process.env.GEMINI_API_KEY) {
    return generateFallbackAnalysis({ resumeText, jobDescription, requiredSkills });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
  });

  const prompt = `
Analyze this candidate resume against the job description.
Return only valid JSON with keys:
score, summary, matchedSkills, missingSkills, strengths, weaknesses.

Job Description:
${jobDescription}

Required Skills:
${requiredSkills.join(", ")}

Resume:
${resumeText}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return normalizeAnalysis(extractJson(text));
};

const generateSummary = async (analysisInput) => {
  const analysis = await analyzeResume(analysisInput);
  return analysis.summary;
};

const generateMatchScore = (matchedSkills = [], missingSkills = []) => {
  const total = matchedSkills.length + missingSkills.length;

  if (!total) {
    return DEFAULT_ANALYSIS.score;
  }

  return Math.round((matchedSkills.length / total) * 100);
};

module.exports = {
  analyzeResume,
  generateSummary,
  generateMatchScore,
};
