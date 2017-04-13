"use strict";

const config = require("./server/config");
const app = require("./server");
const logger = require("winston");

// Start app
app.listen(config.port, config.hostname, () => {
  logger.info(`Server running at http://${config.hostname}:${config.port}/`);
});