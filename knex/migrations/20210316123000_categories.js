exports.up = function (knex) {
  return knex.schema.createTable("categories", function (table) {
    table.increments("id").primary().notNullable();
    table.string("name").notNullable().unique();
    table.dateTime("createdAt").notNullable();
    table.dateTime("updatedAt");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("categories");
};
