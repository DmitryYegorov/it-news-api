const Router = require("koa-router");
const Comment = require("../../../entities/comment");

const comments = new Router();

comments
  .get("/comments/:id", getCommentById)
  .get("/comments/post/:post", getCommentsByPost)
  .post("/comments", createComment)
  .put("/comments/:id", updateComment)
  .delete("/comments/:id", removeComment);

async function getCommentById(ctx, next) {
  try {
    const { id } = ctx.request.params;
    ctx.body = await Comment.getCommentById(id);
    ctx.status = 200;
  } catch (e) {
    next(e);
  }
}

async function getCommentsByPost(ctx, next) {
  try {
    const { post } = ctx.request.params;
    const comment = await Comment.getCommentsByPost(post);
    if (comment) {
      ctx.body = comment;
      ctx.status = 200;
    }
  } catch (e) {
    next(e);
  }
}

async function createComment(ctx, next) {
  try {
    const comment = ctx.request.body;
    if (comment) {
      const res = await Comment.createComment(comment);
      console.log(res);
      ctx.body = JSON.stringify(res);
      ctx.status = 201;
    }
  } catch (e) {
    next(e);
  }
}

async function updateComment(ctx, next) {
  try {
    const { id } = ctx.request.params;
    const comment = ctx.request.body;
    if (comment) {
      const res = await Comment.createComment(id, comment);
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

async function removeComment(ctx, next) {
  try {
    const { id } = ctx.request.params;
    ctx.body = await Comment.removeComment(id);
    ctx.status = 204;
  } catch (e) {
    next(e);
  }
}

module.exports = comments;
