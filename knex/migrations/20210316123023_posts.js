exports.up = function (knex) {
  return knex.schema.createTable("posts", function (table) {
    table.increments("id").primary().notNullable();
    table
      .integer("categoryId")
      .notNullable()
      .index()
      .references("id")
      .inTable("categories")
      .onDelete("CASCADE");
    table.string("title", 255).notNullable();
    table.text("text").notNullable();
    table
      .integer("author")
      .notNullable()
      .index()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.dateTime("createdAt").notNullable();
    table.dateTime("updatedAt");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};
