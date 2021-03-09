const Router = require("koa-router");

const posts = require("./posts");
const comments = require("./comments");
const users = require("./users");
const subscriptions = require("./subscriptions");

const router = new Router({
  prefix: "/api",
});

router.use(posts.routes()).use(posts.allowedMethods());
router.use(comments.routes()).use(posts.allowedMethods());
router.use(users.routes()).use(posts.allowedMethods());
router.use(subscriptions.routes()).use(subscriptions.allowedMethods());

module.exports = router;
