module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
      {
        name: "ENTITY",
        script: "./back-end/index.js",
        cwd: process.cwd(),
        env: {
          COMMON_VARIABLE: "true"
        },
        env_production: {
            "PORT": process.env.ENTITY_PRODUCTION_PORT,
            NODE_ENV: "production",
            HOST: process.env.ENTITY_MYSQL_URL_HOST,
            USER: process.env.ENTITY_MYSQL_USERNAME_USER,
            PASSWORD: process.env.ENTITY_MYSQL_PASSWORD,
            DATABASE: process.env.ENTITY_MYSQL_DATABASE
        },
        env_staging: {
            "PORT": process.env.ENTITY_PRODUCTION_PORT,
            NODE_ENV: "production",
            HOST: process.env.ENTITY_MYSQL_URL_HOST,
            USER: process.env.ENTITY_MYSQL_USERNAME_USER,
            PASSWORD: process.env.ENTITY_MYSQL_PASSWORD,
            DATABASE: process.env.ENTITY_MYSQL_DATABASE
        }
      }
    ]
  };
  
