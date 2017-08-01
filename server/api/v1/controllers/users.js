"use strict";

const logger = require("winston");

exports.all = (req, res, next) => {
    res.json([
        { "_id": 1, "name": "Pedro Perez" },
        { "_id": 2, "name": "Juan Perez" }
    ]);
};

exports.post = (req, res, next) => {
    logger.info(req.body);
    let user = req.body;

    res.json(user);
};

exports.get = (req, res, next) => {
    logger.info(req.params.id);
    let id = req.params.id;

    res.json({ "_id": id });
};

exports.put = (req, res, next) => {
    logger.info(req.params.id);
    logger.info(req.body);
    let id = req.params.id;
    let update = req.body;

    res.json(update);
};

exports.delete = (req, res, next) => {
    logger.info(req.params.id);
    let id = req.params.id;

    res.json({ "_id": id });
};