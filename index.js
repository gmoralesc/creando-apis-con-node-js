"use strict";

const express = require('express');
const server = express();
const morgan = require('morgan');
const logger = require('winston');

const config = require("./server/config");
server.use(morgan('common'));

server.get('/', (req, res, next) => {
  logger.info("Home page");
  res.json({
    "message": "Hello World"
  });
});

server.use( (req, res, next) => {
  logger.info("Route not found");
  res.status(404);
  res.json({
    "message": "Upps. Route not found"
  });
});

server.use(function(err, req, res, next) {
  logger.error("Error");
  res.status(500);
  res.json({
      "message": `${err}`
  });
});

server.listen(config.port, config.hostname, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});