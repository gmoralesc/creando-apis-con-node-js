"use strict";

const express = require('express');
const morgan = require('morgan');
const logger = require('winston');

const app = express();
// Setup middleware
app.use(morgan('common'));

app.get('/', (req, res, next) => {
  logger.info("Home page");
  res.json({
    "message": "Welcome to the API"
  });
});

app.use( (req, res, next) => {
  logger.info("Route not found");
  res.status(404);
  res.json({
    "error": "Error. Route not found"
  });
});

app.use( (err, req, res, next) => {
  logger.error("Error");
  res.status(500);
  res.json({
    "error": `${err}`
  });
});

module.exports = app;