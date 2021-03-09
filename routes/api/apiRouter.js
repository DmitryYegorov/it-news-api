const Router = require("koa-router");

const posts = require("./posts");
const comments = require("./comments");
const users = require("./users");

const router = new Router({
  prefix: "/api",
});

router.use(posts.routes()).use(posts.allowedMethods());
router.use(comments.routes()).use(posts.allowedMethods());
router.use(users.routes()).use(posts.allowedMethods());

module.exports = router;
