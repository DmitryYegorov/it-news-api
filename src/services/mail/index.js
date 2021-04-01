const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const Mustache = require("mustache");

const auth = {
  user: process.env.USER_MAIL,
  pass: process.env.PASS_MAIL,
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth,
});

const template = fs
  .readFileSync(path.join(__dirname, "mustache", "templates", "mustache.html"))
  .toString();
const partials = {
  header: fs
    .readFileSync(path.join(__dirname, "mustache", "partials", "header.html"))
    .toString(),
  body: fs
    .readFileSync(path.join(__dirname, "mustache", "partials", "body.html"))
    .toString(),
};

async function activateAccountMail(to, subject, data) {
  const body = Mustache.render(
    template,
    {
      ...data,
      email: to,
      date: Date.now,
    },
    partials
  );
  await sendNotification(to, subject, body);
}

async function resetPasswordMail(to, subject = "Reset your password", data) {
  const body = Mustache.render(
    template,
    {
      ...data,
      email: to,
      date: Date.now,
    },
    partials
  );
  await sendNotification(to, subject, body);
}

async function sendNotification(to, subject, body) {
  await transporter.sendMail({
    from: auth.user,
    to,
    subject,
    html: body,
  });
}

module.exports = {
  activateAccountMail,
  resetPasswordMail,
};
