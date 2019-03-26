require('dotenv').config('');

const config = {
  server: {
    port: process.env.SERVER_PORT || 3000,
  },
  database: {
    protocol: process.env.DATABASE_PROTOCOL,
    url: process.env.DATABASE_URL,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  pagination: {
    limit: 10,
    skip: 0,
    page: 1,
  },
};

module.exports = config;
