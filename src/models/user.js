const Model = require("./BaseModel");

class UserModel extends Model {
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
      required: ["name", "login", "email"],

      properties: {
        id: { type: "integer" },
        login: { type: "string", minLength: 5, maxLength: 60 },
        email: { type: "string", minLength: 10, maxLength: 60 },
        name: { type: "string", minLength: 10, maxLength: 255 },
        password: { type: "string", minLength: 8, maxLength: 255 },
      },
    };
  }
}

module.exports = UserModel;
