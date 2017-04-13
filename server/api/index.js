"use strict";

var router = require('express').Router();

router.get("/posts", (req, res, next) => {
    res.json([{
      "id": 1,
      "name": "Hello"
    },{
      "id": 2,
      "name": "World"
    }]);
  });

module.exports = router;