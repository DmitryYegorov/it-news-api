const Router = require("koa-router");

const posts = require("./posts");
const comments = require("./comments");
const users = require("./users");
const subscriptions = require("./subscriptions");
const categories = require("./category");
const auth = require("./auth");
const link = require("./link");

const router = new Router({
  prefix: "/api",
});

router.use(posts.routes());
router.use(comments.routes());
router.use(users.routes());
router.use(subscriptions.routes());
router.use(categories.routes());
router.use(auth.routes());
router.use(link.routes());

module.exports = router;
