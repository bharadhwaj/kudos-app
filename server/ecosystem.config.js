const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  apps: [
    {
      name: 'kudos-app-api',
      script: './build/index.js',
      watch: false,
      env_development: {
        NODE_ENV: 'development',
      },
      env_staging: {
        NODE_ENV: 'staging',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
