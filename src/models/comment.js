const Model = require("./BaseModel");
const UserModel = require("./user");

class CommentModel extends Model {
  static get tableName() {
    return "comments";
  }

  static get idColumn() {
    return "id";
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

  static get relationMappings() {
    return {
      author_user: {
        relation: Model.HasManyRelation,
        modelClass: UserModel,
        join: {
          from: "users.id",
          to: "comments.author",
        },
      },
    };
  }
}

module.exports = CommentModel;
