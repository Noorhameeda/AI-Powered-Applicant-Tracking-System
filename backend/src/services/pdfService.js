const pdf = require("pdf-parse");
const fs = require("fs");

const extractTextFromPDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    console.error("PDF Parsing Error:", error);
    return "";
  }
};

module.exports = {
  extractTextFromPDF,
};