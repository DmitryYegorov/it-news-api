const Model = require("./BaseModel");

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
        post: { type: "integer" },
      },
    };
  }
}

module.exports = CommentModel;
