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
  const decode = jwt.decode(token, SECRET);
  ctx.request.body.user = decode.user;
  return next();
}

module.exports = isAuthenticated;
