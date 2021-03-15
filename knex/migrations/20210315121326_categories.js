exports.up = function (knex) {
  knex.schema.createTable("categories", function (table) {
    table.increments("categoryid").primary().notNullable();
    table.string("categoryname").notNullable().unique();
  });
};

exports.down = function (knex) {
  knex.schema.dropTable("categories");
};
