exports.up = function (knex) {
  return knex.schema.createTable("categories", function (table) {
    table.increments("categoryid").primary().notNullable();
    table.string("categoryname").notNullable().unique();
    table.dateTime("created_at").notNullable();
    table.dateTime("updated_at").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("categories");
};
