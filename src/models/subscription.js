const Model = require("./BaseModel");
const UserModel = require("./user");

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

  static get relationMapping() {
    return {
      subscriber: {
        relation: Model.HasManyRelation,
        modelClass: UserModel,

        join: {
          from: "user.id",
          to: "subscriptions.subscriber",
        },
      },
      author: {
        relation: Model.HasManyRelation,
        modelClass: UserModel,

        join: {
          from: "user.id",
          to: "subscriptions.author",
        },
      },
    };
  }
}

module.exports = SubscriptionModel;
