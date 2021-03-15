const Model = require("./BaseModel");

class PostModel extends Model {
  static get tableName() {
    return "posts";
  }

  static get idColumn() {
    return "postid";
  }

  static get timestamp() {
    return true;
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["posttitle", "posttext", "postauthor"],

      properties: {
        postid: { type: "integer" },
        posttitle: { type: "string", minLength: 5, maxLength: 60 },
        posttext: { type: "string" },
        postauthor: { type: "integer" },
        postcategory: { type: "integer" },
      },
    };
  }
}

module.exports = PostModel;
