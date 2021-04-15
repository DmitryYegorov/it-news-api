exports.up = function (knex) {
  return knex.schema.createTable("subscriptions", function (table) {
    table.increments("id").primary().notNullable();
    table
      .integer("subscriber")
      .notNullable()
      .index()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .integer("author")
      .notNullable()
      .index()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.dateTime("createdAt").notNullable();
    table.dateTime("updatedAt");
  });
};

exports.down = function (knex) {
  knex.schema.dropTable("subscriptions");
};
