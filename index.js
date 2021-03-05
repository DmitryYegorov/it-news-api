const Koa = require("koa");

const app = new Koa();
const { PORT } = process.env;
const posts = require("./routes/api/posts");

app.use(posts.routes()).use(posts.allowedMethods());
app.listen(PORT);
