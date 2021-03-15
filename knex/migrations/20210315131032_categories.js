exports.up = function (knex) {
  return knex.schema.createTable("categories", function (table) {
    table.increments("categoryid").primary().notNullable();
    table.string("categoryname").notNullable().unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("categories");
};
