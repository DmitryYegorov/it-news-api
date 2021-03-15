exports.up = function (knex) {
  return knex.schema.createTable("comments", function (table) {
    table.increments("commentid").primary().notNullable();
    table
      .integer("commentauthor")
      .notNullable()
      .index()
      .references("userid")
      .inTable("users")
      .onDelete("SET NULL");
    table.text("commenttext").notNullable();
    table
      .integer("commentpost")
      .notNullable()
      .index()
      .references("postid")
      .inTable("posts")
      .onDelete("SET NULL");
    table.dateTime("created_at").notNullable();
    table.dateTime("updated_at").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
