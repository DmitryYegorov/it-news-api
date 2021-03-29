const nodemailer = require("nodemailer");

const auth = {
  user: process.env.USER_MAIL,
  pass: process.env.PASS_MAIL,
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth,
});

async function sendNotification(to, subject, body) {
  await transporter.sendMail({
    from: auth.user,
    to,
    subject,
    html: body,
  });
}

module.exports = {
  sendNotification,
};
