const Router = require("koa-router");
const Post = require("../../../entities/post");

const posts = new Router();

posts
  .get("/posts", getAllPosts)
  .get("/posts/:id", getPostById)
  .get("/posts/category/:category", getPostsByCategory)
  .get("/posts/author/:author", getPostsByAuthor)
  .post("/posts", createPost)
  .put("/posts/:id", updatePost)
  .delete("/posts/:id", removePost);

async function getAllPosts(ctx, next) {
  try {
    ctx.body = await Post.getAllPosts();
    next();
  } catch (e) {
    ctx.body = e;
    ctx.status = 500;
  }
}

async function getPostById(ctx, next) {
  try {
    const { id } = ctx.request.params;
    const post = await Post.getPostById(id);
    ctx.body = JSON.stringify(post);
    ctx.status = 200;
    next();
  } catch (e) {
    ctx.body = e;
    ctx.status = 500;
  }
}

async function getPostsByCategory(ctx, next) {
  try {
    const { category } = ctx.request.params;
    ctx.body = await Post.getPostsByCategory(category);
    next();
  } catch (e) {
    ctx.body = e;
    ctx.status = 500;
  }
}

async function getPostsByAuthor(ctx, next) {
  try {
    const { author } = ctx.request.params;
    ctx.body = await Post.getPostsByAuthor(author);
    ctx.status = 201;
    next();
  } catch (e) {
    ctx.body = e;
    ctx.status = 500;
  }
}

async function createPost(ctx, next) {
  try {
    const post = ctx.request.body;
    if (post) {
      const res = await Post.createPost(post);
      ctx.status = 201;
      ctx.body = JSON.stringify(res);
      next();
    }
  } catch (e) {
    ctx.body = e;
    ctx.status = 500;
  }
}

async function updatePost(ctx, next) {
  try {
    const data = ctx.request.body;
    const { id } = ctx.request.params;
    if (data) {
      const res = await Post.updatePost(id, data);
      ctx.status = 200;
      ctx.body = JSON.stringify(res);
      next();
    }
  } catch (e) {
    ctx.body = e;
    ctx.status = 500;
  }
}

async function removePost(ctx, next) {
  try {
    const { id } = ctx.request.params;
    ctx.body = await Post.removePostById(id);
    ctx.status = 204;
    next();
  } catch (e) {
    ctx.body = e;
    ctx.status = 500;
  }
}

module.exports = posts;
