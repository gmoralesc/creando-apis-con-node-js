"use strict";

const router = require("express").Router();
const logger = require("winston");

router.get("/users", (req, res, next) => {
    logger.info("Get all users");
    res.json({
      "message": "Get all Users"
    });
  });

module.exports = router;