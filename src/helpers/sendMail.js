import nodemailer from "nodemailer";

const sendMail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: "jarvissilva212@gmail.com",
      pass: process.env.GMAIL_HOST_PASSWORD,
    },
  });
  return transporter.sendMail({
    from: "jarvissilva212@gmail.com",
    to,
    subject,
    html,
  });
};

export default sendMail;
