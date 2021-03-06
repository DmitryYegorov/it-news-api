const Model = require("./BaseModel");

class UserModel extends Model {
  static get hidden() {
    return ["password", "activationCode", "recoveryPasswordCode"];
  }

  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
        email: { type: "string" },
        name: { type: "string" },
        password: { type: "string", minLength: 8, maxLength: 255 },
      },
    };
  }
}

module.exports = UserModel;
