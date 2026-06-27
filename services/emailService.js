const nodemailer = require("nodemailer");

const createTransporter = () => {
  if (!process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      jsonTransport: true,
    });
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      : undefined,
  });
};

const templates = {
  shortlisted: ({ name = "Candidate", jobTitle = "the role" }) => ({
    subject: `Shortlisted for ${jobTitle}`,
    text: `Hi ${name}, you have been shortlisted for ${jobTitle}.`,
    html: `<p>Hi ${name},</p><p>You have been <strong>shortlisted</strong> for ${jobTitle}.</p>`,
  }),
  interview: ({ name = "Candidate", jobTitle = "the role", interviewDate = "the scheduled time" }) => ({
    subject: `Interview Invitation for ${jobTitle}`,
    text: `Hi ${name}, you are invited to interview for ${jobTitle} at ${interviewDate}.`,
    html: `<p>Hi ${name},</p><p>You are invited to interview for <strong>${jobTitle}</strong> at ${interviewDate}.</p>`,
  }),
  rejected: ({ name = "Candidate", jobTitle = "the role" }) => ({
    subject: `Application update for ${jobTitle}`,
    text: `Hi ${name}, thank you for applying to ${jobTitle}. We will not move forward at this time.`,
    html: `<p>Hi ${name},</p><p>Thank you for applying to ${jobTitle}. We will not move forward at this time.</p>`,
  }),
  selected: ({ name = "Candidate", jobTitle = "the role" }) => ({
    subject: `Selected for ${jobTitle}`,
    text: `Hi ${name}, congratulations! You have been selected for ${jobTitle}.`,
    html: `<p>Hi ${name},</p><p>Congratulations! You have been <strong>selected</strong> for ${jobTitle}.</p>`,
  }),
};

const sendEmail = async ({ to, subject, text, html }) => {
  if (!to) {
    throw new Error("Recipient email is required");
  }

  const transporter = createTransporter();
  return transporter.sendMail({
    from: process.env.EMAIL_FROM || "ATS <no-reply@example.com>",
    to,
    subject,
    text,
    html,
  });
};

const sendTemplateEmail = async (templateName, payload) => {
  const template = templates[templateName];

  if (!template) {
    throw new Error("Unknown email template");
  }

  return sendEmail({
    to: payload.to,
    ...template(payload),
  });
};

module.exports = {
  templates,
  sendEmail,
  sendTemplateEmail,
};
