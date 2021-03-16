exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("name", 255).notNullable();
    table.string("email", 255).notNullable().unique();
    table.string("password", 255).notNullable();
    table.dateTime("created_at").notNullable();
    table.dateTime("updated_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
