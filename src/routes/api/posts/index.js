const Router = require("koa-router");
const Post = require("../../../entities/post");

const posts = new Router({
  prefix: "/posts",
});

posts
  .get("/", getAllPosts)
  .get("/:id", getPostById)
  .get("/category/:category", getPostsByCategory)
  .get("/author/:author", getPostsByAuthor)
  .post("/", createPost)
  .put("/:id", updatePost)
  .delete("/:id", removePost);

async function getAllPosts(ctx) {
  ctx.body = await Post.getAllPosts();
  ctx.status = 200;
}

async function getPostById(ctx) {
  const { id } = ctx.request.params;
  ctx.body = await Post.getPostById(id);
  ctx.status = 200;
}

async function getPostsByCategory(ctx) {
  const { category } = ctx.request.params;
  ctx.body = await Post.getPostsByCategory(category);
  ctx.status = 200;
}

async function getPostsByAuthor(ctx) {
  const { author } = ctx.request.params;
  ctx.body = await Post.getPostsByAuthor(author);
  ctx.status = 201;
}

async function createPost(ctx) {
  const post = ctx.request.body;
  const res = await Post.createPost(post);
  ctx.status = 201;
  ctx.body = res;
}

async function updatePost(ctx) {
  const data = ctx.request.body;
  const { id } = ctx.request.params;
  const res = await Post.updatePost(id, data);
  ctx.status = 200;
  ctx.body = res;
}

async function removePost(ctx) {
  const { id } = ctx.request.params;
  ctx.body = await Post.removePostById(id);
  ctx.status = 204;
}

module.exports = posts;
