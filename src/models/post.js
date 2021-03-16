const Model = require("./BaseModel");

class PostModel extends Model {
  static get tableName() {
    return "posts";
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
      required: ["title", "text", "author"],

      properties: {
        id: { type: "integer" },
        title: { type: "string", minLength: 5, maxLength: 60 },
        text: { type: "string" },
        author: { type: "integer" },
        category: { type: "integer" },
      },
    };
  }
}

module.exports = PostModel;
