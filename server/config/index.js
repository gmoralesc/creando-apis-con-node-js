// server/config/index.js

require('dotenv').config('');

const config = {
  server: {
    port: process.env.SERVER_PORT,
  },
};

module.exports = config;
