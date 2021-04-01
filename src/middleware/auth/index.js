const jwt = require("jsonwebtoken");
const Error401 = require("../error/Error401");

const { SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = async (ctx, next) => {
  if (ctx.method === "OPTIONS") {
    await next();
  }
  const token = ctx.headers.authorization.split(" ")[1];
  if (!token) {
    throw new Error401();
  }
  ctx.request.body.user = jwt.verify(token, SECRET);
};
