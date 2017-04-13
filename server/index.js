"use strict";

const express = require("express");
const morgan = require("morgan");
const logger = require("winston");

const app = express();
// Setup Middleware
app.use(morgan("common"));

// Setup Routes
app.get('/', (req, res, next) => {
  logger.info("Home page");
  res.json({
    "message": "Hello World"
  });
});

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
