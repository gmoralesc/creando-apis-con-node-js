"use strict";

const express = require('express');
const server = express();

const config = require("./server/config");

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.listen(config.port, config.hostname, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});