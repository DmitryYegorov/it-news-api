exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("userid").primary();
    table.string("userlogin", 20).notNullable().unique();
    table.string("username", 255).notNullable();
    table.string("useremail", 255).notNullable().unique();
    table.string("password", 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
