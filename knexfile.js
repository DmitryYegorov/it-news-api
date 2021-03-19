const dotenv = require("dotenv");

dotenv.config();

const {
  DB_NAME,
  DB_PASSWORD,
  DB_USERNAME,
  DB_HOST,
  DB_PORT,
  DB_CLIENT,
} = process.env;

module.exports = {
  development: {
    client: DB_CLIENT,
    connection: {
      database: DB_NAME,
      port: DB_PORT,
      host: DB_HOST,
      user: DB_USERNAME,
      password: DB_PASSWORD,
    },
    migrations: {
      directory: "knex/migrations",
    },
    debug: true,
  },
};
