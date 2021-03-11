const { DB_NAME, DB_PASSWORD, DB_USERNAME, DB_HOST } = process.env;

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: DB_NAME,
      host: DB_HOST,
      user: DB_USERNAME,
      password: DB_PASSWORD,
    },
    debug: true,
  },
};
