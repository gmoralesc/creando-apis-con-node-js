"use strict";

const express = require('express');
const server = express();

const config = require("./server/config");

server.get('/', (req, res, next) => {
  res.send('Hello World');
});

server.use( (req, res, next) => {
  res.status(404);
  res.json({
    "message": "Error. Route not found"
  });
});

server.listen(config.port, config.hostname, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});