const { Model } = require("objection");
const { timestampPlugin } = require("objection-timestamps");

class PostModel extends timestampPlugin()(Model) {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "userid";
  }

  static get timestamp() {
    return true;
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username", "userlogin", "useremail"],

      properties: {
        postid: { type: "integer" },
        posttitle: { type: "string", minLength: 5, maxLength: 60 },
        posttext: { type: "string", minLength: 10, maxLength: 60 },
        postauthor: { type: "integer" },
      },
    };
  }
}

module.exports = PostModel;
