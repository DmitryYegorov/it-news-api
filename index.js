const Koa = require("koa");

const app = new Koa();
const { PORT } = process.env;
const posts = require("./routes/api/posts");
const users = require("./routes/api/users");
const comments = require("./routes/api/comments");

app.use(posts.routes()).use(posts.allowedMethods());
app.use(users.routes()).use(users.allowedMethods());
app.use(comments.routes()).use(comments.allowedMethods());
app.listen(PORT);
