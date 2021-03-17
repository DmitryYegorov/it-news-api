exports.up = function (knex) {
  return knex.schema.createTable("comments", function (table) {
    table.increments("id").primary().notNullable();
    table
      .integer("author")
      .notNullable()
      .index()
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");
    table.text("text").notNullable();
    table
      .integer("postId")
      .notNullable()
      .index()
      .references("id")
      .inTable("posts")
      .onDelete("SET NULL");
    table.dateTime("created_at").notNullable();
    table.dateTime("updated_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
