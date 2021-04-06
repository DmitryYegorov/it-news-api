const jwt = require("jsonwebtoken");
const Error401 = require("../error/Error401");

const { SECRET } = process.env;

// eslint-disable-next-line consistent-return
async function isAuthenticated(ctx, next) {
  if (ctx.method === "OPTIONS") {
    return next();
  }
  if (!ctx.headers.authorization) {
    throw new Error401();
  }
  const token = ctx.headers.authorization.split(" ")[1];
  ctx.request.body.user = jwt.verify(token, SECRET);
  return next();
}

module.exports = isAuthenticated;
