const Model = require("./base");

class CategoryModel extends Model {
  static get tableName() {
    return "categories";
  }

  static get idColumn() {
    return "categoryid";
  }

  static get timestamp() {
    return true;
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["categoryname"],

      properties: {
        categoryid: { type: "integer" },
        categoryname: { type: "string", minLength: 5, maxLength: 60 },
      },
    };
  }
}

module.exports = CategoryModel;
