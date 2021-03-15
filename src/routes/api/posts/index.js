const Router = require("koa-router");
const Post = require("../../../entities/post");

const posts = new Router();

posts
  .get("/posts", getAllPosts)
  .get("/posts/:id", getPostById)
  .post("/posts", createPost)
  .put("/posts/:id", updatePost)
  .delete("/posts/:id", removePost);

async function getAllPosts(ctx, next) {
  try {
    ctx.body = await Post.getAllPosts();
    next();
  } catch (e) {
    console.log(e);
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
    console.error(e);
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
    console.log(e);
    ctx.status = 500;
    ctx.body = e;
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
    console.log(e);
    ctx.status = 500;
    ctx.body = e;
  }
}

async function removePost(ctx, next) {
  try {
    const { id } = ctx.request.params;
    ctx.body = await Post.removePostById(id);
    ctx.status = 204;
    next();
  } catch (e) {
    console.log(e);
    ctx.status = 500;
    ctx.body = e;
  }
}

module.exports = posts;
