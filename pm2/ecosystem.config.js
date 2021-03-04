module.exports = {
  apps: [
    {
      script: "index.js",
      watch: ".",
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      env_prod: {
        NODE_ENV: "production",
        PORT: 80,
      },
    },
  ],
};
