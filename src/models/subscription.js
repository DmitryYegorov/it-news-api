const Model = require("./BaseModel");

class SubscriptionModel extends Model {
  static get tableName() {
    return "subscriptions";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["subscriber", "author"],

      properties: {
        id: { type: "integer" },
        subscriber: { type: "string", minLength: 5, maxLength: 60 },
        author: { type: "string", minLength: 5, maxLength: 60 },
      },
    };
  }
}

module.exports = SubscriptionModel;
