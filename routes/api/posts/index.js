const Router = require("koa-router");

const posts = new Router();

posts
  .get("/posts", getAllPosts)
  .get("/post/:id", getPostById)
  .get("/posts/author/:id", getPostsByCategory)
  .get("/posts/category/:id", getPostsByAuthor)
  .post("/post", createPost)
  .put("/post/:id", updatePost)
  .delete("/post/:id", removePost);

function getAllPosts(ctx, next) {
  ctx.body = "Get the posts by author (userId)";
  next();
}

function getPostById(ctx, next) {
  ctx.body = "Get the posts by category";
  next();
}

function getPostsByAuthor(ctx, next) {
  ctx.body = "Get the posts by author (userId)";
  next();
}

function getPostsByCategory(ctx, next) {
  ctx.body = "Get the posts by category";
  next();
}

function createPost(ctx, next) {
  ctx.body = "Create a new post";
  next();
}

function updatePost(ctx, next) {
  ctx.body = "Update a post";
  next();
}

function removePost(ctx, next) {
  ctx.body = "Delete a post";
  next();
}

module.exports = posts;
