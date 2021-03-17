const Model = require("./BaseModel");
const UserModel = require("./user");
const PostModel = require("./post");

class CommentModel extends Model {
  static get tableName() {
    return "comments";
  }

  static get idColumn() {
    return "id";
  }

  static get timestamp() {
    return true;
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["text"],

      properties: {
        id: { type: "integer" },
        text: { type: "string" },
        author: { type: "integer" },
        postId: { type: "integer" },
      },
    };
  }

  static get relationMapping() {
    return {
      author: {
        relation: Model.HasManyRelation,
        modelClass: UserModel,
        join: {
          from: "users.id",
          to: "comments.author",
        },
      },
      post: {
        relation: Model.HasOneRelation,
        modelClass: PostModel,
        join: {
          from: "posts.id",
          to: "comments.postId",
        },
      },
    };
  }
}

module.exports = CommentModel;
