"use strict";

const app = require("./server");

const config = require("./server/config");

app.listen(config.port, config.hostname, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});