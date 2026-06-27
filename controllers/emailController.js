const { sendTemplateEmail } = require("../services/emailService");

const sendTemplate = (templateName) => async (req, res) => {
  try {
    const info = await sendTemplateEmail(templateName, req.body);

    return res.status(200).json({
      success: true,
      message: "Email sent",
      template: templateName,
      messageId: info.messageId,
      preview: info.message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
};

module.exports = {
  sendInterviewEmail: sendTemplate("interview"),
  sendRejectEmail: sendTemplate("rejected"),
  sendShortlistEmail: sendTemplate("shortlisted"),
};
