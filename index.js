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
    "message": "Upps. Route not found"
  });
});

server.use(function(err, req, res, next) {
  res.status(500);
  res.json({
      "message": `${err}`
  });
});

server.listen(config.port, config.hostname, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});