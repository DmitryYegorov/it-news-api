const Router = require("koa-router");
const Post = require("../../../entities/post");
const authenticated = require("../../../middleware/auth");
const {
  validateQuery,
  validateBody,
  PostSchema,
  IdSchema,
  CategoryIdSchema,
  AuthorIdSchema,
} = require("./validate");

const posts = new Router({
  prefix: "/posts",
});

posts
  .get("/", getAllPosts)
  .get("/:id", getPostById)
  .get(
    "/category/:category",
    validateQuery(CategoryIdSchema),
    getPostsByCategory
  )
  .get("/author/:author", validateQuery(AuthorIdSchema), getPostsByAuthor)
  .post("/", authenticated, validateBody(PostSchema), createPost)
  .put(
    "/:id",
    authenticated,
    validateQuery(IdSchema),
    validateBody(PostSchema),
    updatePost
  )
  .delete("/:id", authenticated, validateQuery(IdSchema), removePost);

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
