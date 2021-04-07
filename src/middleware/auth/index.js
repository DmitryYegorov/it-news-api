const jwt = require("jsonwebtoken");
const Error401 = require("../error/error401");

const { SECRET } = process.env;

// eslint-disable-next-line consistent-return
async function isAuthenticated(ctx, next) {
  if (ctx.method === "OPTIONS") {
    return next();
  }
  try {
    const token = ctx.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error401();
    }
    const decode = await jwt.verify(token, SECRET);
    if (decode.exp * 1000 < new Date().setDate(new Date().getDate())) {
      throw new Error401();
    }
    ctx.request.body.user = decode;
    await next();
  } catch (e) {
    throw new Error401();
  }
}

module.exports = isAuthenticated;
