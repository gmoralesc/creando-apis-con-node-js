"use strict";

const express = require("express");
const bodyParser = require('body-parser');
const morgan = require("morgan");
const logger = require("winston");

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
    "message": "Upps. Route not found"
  });
});

// Global error handler
app.use(function(err, req, res, next) {
  logger.error("Error");
  res.status(500);
  res.json({
      "message": `${err}`
  });
});

module.exports = app;
