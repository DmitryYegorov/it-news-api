const Koa = require("koa");

const app = new Koa();
const { PORT } = process.env;
const posts = require("./routes/api/posts");
const users = require("./routes/api/users");

app.use(posts.routes()).use(posts.allowedMethods());
app.use(users.routes()).use(users.allowedMethods());
app.listen(PORT);
