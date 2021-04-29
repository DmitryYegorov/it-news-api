const knex = require("knex");
const { Model } = require("objection");
const knexfile = require("../knexfile");

function setupDb() {
  const db = knex(knexfile.production);
  Model.knex(db);
}

module.exports = setupDb;
