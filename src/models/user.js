const { Model } = require("objection");

class UserModel extends Model {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "userid";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username", "userlogin", "useremail"],

      properties: {
        userid: { type: "integer" },
        userlogin: { type: "string", minLength: 5, maxLength: 60 },
        username: { type: "string", minLength: 10, maxLength: 255 },
        userpassword: { type: "string", minLength: 8, maxLength: 255 },
      },
    };
  }
}

module.exports = UserModel;
