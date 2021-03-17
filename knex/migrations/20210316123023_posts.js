exports.up = function (knex) {
  return knex.schema.createTable("posts", function (table) {
    table.increments("id").primary().notNullable();
    table
      .integer("categoryId")
      .notNullable()
      .index()
      .references("id")
      .inTable("categories")
      .onDelete("SET NULL");
    table.string("title", 255).notNullable();
    table.text("text").notNullable();
    table
      .integer("author")
      .notNullable()
      .index()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");
    table.dateTime("created_at").notNullable();
    table.dateTime("updated_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};
