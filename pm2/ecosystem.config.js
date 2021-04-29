module.exports = {
  apps: [
    {
      script: "index.js",
      watch: true,
      env: {
        NODE_ENV: "development",
        PORT: 5000,
      },
      env_prod: {
        NODE_ENV: "production",
        PORT: 80,
      },
    },
  ],
};
