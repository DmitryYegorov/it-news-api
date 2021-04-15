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

const templates = {
  activate: fs
    .readFileSync(
      path.join(__dirname, "mustache", "templates", "activate.html")
    )
    .toString(),
  newPassword: fs
    .readFileSync(
      path.join(__dirname, "mustache", "templates", "newPassword.html")
    )
    .toString(),
};

const partials = {
  header: fs
    .readFileSync(path.join(__dirname, "mustache", "partials", "header.html"))
    .toString(),
  activateBody: fs
    .readFileSync(
      path.join(__dirname, "mustache", "partials", "activateBody.html")
    )
    .toString(),
  newPasswordBody: fs
    .readFileSync(
      path.join(__dirname, "mustache", "partials", "newPasswordBody.html")
    )
    .toString(),
};

async function sendNotification(subject, template, email, data) {
  await transporter.sendMail({
    from: "IT-news <dmitrii.egorow2014@yandex.ru>",
    to: email,
    subject,
    html: Mustache.render(templates[template], data, partials),
  });
}

module.exports = {
  sendNotification,
};
