exports.up = function (knex) {
  return knex.schema.createTable("comments", function (table) {
    table.increments("id").primary().notNullable();
    table
      .integer("author")
      .notNullable()
      .index()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.text("text").notNullable();
    table
      .integer("postId")
      .notNullable()
      .index()
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE");
    table.dateTime("createdAt").notNullable();
    table.dateTime("updatedAt");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
