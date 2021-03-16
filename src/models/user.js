const { visibilityPlugin } = require("objection-visibility");
const Model = require("./BaseModel");

class UserModel extends visibilityPlugin(Model) {
  static get hidden() {
    return ["password"];
  }

  static get tableName() {
    return "users";
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
      required: ["name", "email"],

      properties: {
        id: { type: "integer" },
        email: { type: "string", minLength: 10, maxLength: 60 },
        name: { type: "string", minLength: 10, maxLength: 255 },
        password: { type: "string", minLength: 8, maxLength: 255 },
      },
    };
  }
}

module.exports = UserModel;
