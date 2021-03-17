const Router = require("koa-router");
const Comment = require("../../../entities/comment");

const comments = new Router({
  prefix: "/comments",
});

comments
  .get("/:id", getCommentById)
  .get("/post/:post", getCommentsByPost)
  .post("/", createComment)
  .put("/:id", updateComment)
  .delete("/:id", removeComment);

async function getCommentById(ctx, next) {
  try {
    const { id } = ctx.request.params;
    const comment = await Comment.getCommentById(id);
    if (comment) {
      ctx.body = comment;
      ctx.status = 200;
      next();
    }
  } catch (e) {
    ctx.body = e;
    ctx.status = 500;
  }
}

async function getCommentsByPost(ctx, next) {
  try {
    const { post } = ctx.request.params;
    const comment = await Comment.getCommentsByPost(post);
    if (comment) {
      ctx.body = comment;
      ctx.status = 200;
      next();
    }
  } catch (e) {
    ctx.body = e;
    ctx.status = 500;
  }
}

async function createComment(ctx, next) {
  try {
    const comment = ctx.request.body;
    const res = await Comment.createComment(comment);
    if (res) {
      ctx.body = res;
      ctx.status = 201;
      next();
    }
  } catch (e) {
    ctx.body = e;
    ctx.status = 500;
  }
}

async function updateComment(ctx, next) {
  try {
    const { id } = ctx.request.params;
    const comment = ctx.request.body;
    const res = await Comment.createComment(id, comment);
    if (res) {
      ctx.status = 201;
      ctx.body = res;
      next();
    }
  } catch (e) {
    ctx.status = 500;
    ctx.body = e;
  }
}

async function removeComment(ctx, next) {
  try {
    const { id } = ctx.request.params;
    const removed = await Comment.removeComment(id);
    if (removed) {
      ctx.body = removed;
      ctx.status = 204;
      next();
    }
  } catch (e) {
    ctx.body = e;
    ctx.status = 500;
  }
}

module.exports = comments;
