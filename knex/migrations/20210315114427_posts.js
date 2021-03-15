exports.up = function (knex) {
  return knex.schema.createTable("posts", function (table) {
    table.increments("postid").primary().notNullable();
    table.string("posttitle", 255).notNullable();
    table.text("posttext").notNullable();
    table
      .integer("postauthor")
      .index()
      .references("userid")
      .inTable("users")
      .onDelete("SET NULL");
    table.dateTime("created_at").notNullable();
    table.dateTime("updated_at").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};
