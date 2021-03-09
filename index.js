const Koa = require("koa");

const app = new Koa();
const { PORT } = process.env;
const api = require("./routes/api/apiRouter");

app.use(api.routes()).use(api.allowedMethods());
app.listen(PORT);
