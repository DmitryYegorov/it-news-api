exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("name", 255).notNullable();
    table.string("email", 255).notNullable().unique();
    table.string("password", 255).notNullable();
    table.integer("activationCode");
    table.dateTime("createdAt").notNullable();
    table.dateTime("updatedAt");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
