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

async function getAllPosts(ctx, next) {
  try {
    const data = await Post.getAllPosts();
    if (data.length) {
      ctx.body = data;
      ctx.status = 200;
      next();
    }
  } catch (e) {
    ctx.body = e;
    ctx.status = 500;
  }
}

async function getPostById(ctx, next) {
  try {
    const { id } = ctx.request.params;
    const data = await Post.getPostById(id);
    if (data) {
      ctx.body = data;
      ctx.status = 200;
      next();
    }
  } catch (e) {
    ctx.body = e;
    ctx.status = 500;
  }
}

async function getPostsByCategory(ctx, next) {
  try {
    const { category } = ctx.request.params;
    const data = await Post.getPostsByCategory(category);
    if (data.length) {
      ctx.body = data;
      ctx.status = 200;
      next();
    }
  } catch (e) {
    ctx.body = e;
    ctx.status = 500;
  }
}

async function getPostsByAuthor(ctx, next) {
  try {
    const { author } = ctx.request.params;
    const data = await Post.getPostsByAuthor(author);
    if (data.length) {
      ctx.body = data;
      ctx.status = 201;
      next();
    }
  } catch (e) {
    ctx.body = e;
    ctx.status = 500;
  }
}

async function createPost(ctx, next) {
  try {
    const post = ctx.request.body;
    const res = await Post.createPost(post);
    if (res) {
      ctx.status = 201;
      ctx.body = res;
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
    const res = await Post.updatePost(id, data);
    if (res) {
      ctx.status = 200;
      ctx.body = res;
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
    const data = await Post.removePostById(id);
    if (data) {
      ctx.body = data;
      ctx.status = 204;
      next();
    }
  } catch (e) {
    ctx.body = e;
    ctx.status = 500;
  }
}

module.exports = posts;
