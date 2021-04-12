const Router = require("koa-router");
const Post = require("../../../entities/post");
const authenticated = require("../../../middleware/auth");
const {
  validateQuery,
  validateBody,
  PostMiddleware,
  IdMiddleware,
  CategoryIdMiddleware,
  AuthorIdMiddleware,
} = require("./validate");

const posts = new Router({
  prefix: "/posts",
});

posts
  .get("/", getAllPosts)
  .get("/:id", getPostById)
  .get(
    "/category/:category",
    validateQuery(CategoryIdMiddleware),
    getPostsByCategory
  )
  .get("/author/:author", validateQuery(AuthorIdMiddleware), getPostsByAuthor)
  .post("/", authenticated, validateBody(PostMiddleware), createPost)
  .put(
    "/:id",
    authenticated,
    validateQuery(IdMiddleware),
    validateBody(PostMiddleware),
    updatePost
  )
  .delete("/:id", authenticated, validateQuery(IdMiddleware), removePost);

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
  const { categoryId, title, text, user } = ctx.request.body;
  await Post.createPost({
    categoryId,
    title,
    text,
    author: user,
  });
  ctx.status = 201;
}

async function updatePost(ctx) {
  const data = ctx.request.body;
  const { id } = ctx.request.params;
  await Post.updatePost(id, data);
  ctx.status = 204;
}

async function removePost(ctx) {
  const { id } = ctx.request.params;
  ctx.body = await Post.removePostById(id);
  ctx.status = 204;
}

module.exports = posts;
