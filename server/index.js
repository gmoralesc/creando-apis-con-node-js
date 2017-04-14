"use strict";

const express = require("express");
const bodyParser = require('body-parser');
const morgan = require("morgan");
const logger = require("winston");
const mongoose = require("mongoose");
const bluebird = require("bluebird");

const config = require("./config");

mongoose.Promise = bluebird;
mongoose.connect(config.db.url);

const api = require("./api/v1");

const app = express();
// Setup Middleware
app.use(morgan("common"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Setup Routes
app.use("/api/v1", api);
app.use("/api", api);

// Handle missing routes
app.use( (req, res, next) => {
  logger.info("Route not found");
  res.status(404);
  res.json({
    "error": "Upps. Route not found"
  });
});

// Global error handler
app.use(function(err, req, res, next) {
  logger.error("Error");
  res.status(500);
  res.json({
      "error": `${err}`
  });
});

module.exports = app;
