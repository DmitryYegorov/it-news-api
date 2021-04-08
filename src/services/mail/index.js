const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const Mustache = require("mustache");
const jwt = require("jsonwebtoken");

const auth = {
  user: process.env.USER_MAIL,
  pass: process.env.PASS_MAIL,
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth,
});

const { SECRET } = process.env;

const templateActivate = fs
  .readFileSync(path.join(__dirname, "mustache", "templates", "activate.html"))
  .toString();
const templateNewPass = fs
  .readFileSync(
    path.join(__dirname, "mustache", "templates", "newPassword.html")
  )
  .toString();
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

async function sendNotification(code, type) {
  const { email, name } = await jwt.decode(code, SECRET);
  const body = type === "activate" ? templateActivate : templateNewPass;
  const subject = type === "activate" ? "Activate account" : "Update password";
  await transporter.sendMail({
    from: "IT-news <dmitrii.egorow2014@yandex.ru>",
    to: email,
    subject,
    html: Mustache.render(
      body,
      {
        name,
        code,
      },
      partials
    ),
  });
}

module.exports = {
  sendNotification,
};
