const Model = require("./BaseModel");

class CategoryModel extends Model {
  static get tableName() {
    return "categories";
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
      required: ["name"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 5, maxLength: 60 },
      },
    };
  }
}

module.exports = CategoryModel;
