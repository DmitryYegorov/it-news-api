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
        subscriber: { type: "integer" },
        author: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    // eslint-disable-next-line global-require,no-unused-vars
    const UserModel = require("./user");
    return {
      subscriptions_users: {
        relation: Model.HasManyRelation,
        modelClass: UserModel,
        join: {
          from: "subscriptions.subscriber",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = SubscriptionModel;
