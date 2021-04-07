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

async function activateEmail(code) {
  const decoded = jwt.verify(code, process.env.SECRET);
  const { email, name, id } = decoded;
  await sendNotification(
    decoded.email,
    "Activate your account",
    {
      email,
      name,
      code,
      id,
    },
    templateActivate
  );
}

async function newPasswordEmail(code) {
  const decoded = jwt.verify(code, process.env.SECRET);
  const { email, name, id } = decoded;
  await sendNotification(
    decoded.email,
    "Update password",
    {
      email,
      name,
      code,
      id,
    },
    templateNewPass
  );
}

async function sendNotification(to, subject, data, body) {
  await transporter.sendMail({
    from: auth.user,
    to,
    subject,
    html: Mustache.render(body, data, partials),
  });
}

module.exports = {
  activateEmail,
  newPasswordEmail,
};
