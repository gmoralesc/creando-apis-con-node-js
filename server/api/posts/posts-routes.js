"use strict";

var router = require('express').Router();

router.route("/")
    .get((req, res, next) => {
        res.json([{
            "id": 1,
            "name": "Hello"
        },{
            "id": 2,
            "name": "World"
        }]);
    });

module.exports = router;
