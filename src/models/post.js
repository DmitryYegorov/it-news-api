const Model = require("./BaseModel");
const UserModel = require("./user");
const CategoryModel = require("./category");

class PostModel extends Model {
  static get tableName() {
    return "posts";
  }

  static get idColumn() {
    return "id";
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
        categoryId: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    return {
      authorUser: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: "users.id",
          to: "posts.author",
        },
      },
      categoryName: {
        relation: Model.HasOneRelation,
        modelClass: CategoryModel,
        join: {
          from: "categories.id",
          to: "posts.categoryId",
        },
      },
    };
  }
}

module.exports = PostModel;
