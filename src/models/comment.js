const Model = require("./BaseModel");

class CommentModel extends Model {
  static get tableName() {
    return "comments";
  }

  static get idColumn() {
    return "commentid";
  }

  static get timestamp() {
    return true;
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["commenttext"],

      properties: {
        commentid: { type: "integer" },
        commenttext: { type: "string" },
        commentauthor: { type: "integer" },
        commentpost: { type: "integer" },
      },
    };
  }
}

module.exports = CommentModel;
