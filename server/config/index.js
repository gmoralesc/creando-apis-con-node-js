"use strict";

const config = {
  env: process.env.NODE_ENV || 'development',
  hostname: process.env.PORT || '127.0.0.1',
  port: process.env.PORT || 3000,
};

module.exports = config;
