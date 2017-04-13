"use strict";

const logger = require("winston");

exports.all = (req, res, next) => {
    res.json({});
};

exports.post = (req, res, next) => {
    logger.info(req.body.id);
    res.json({});
};

exports.get = (req, res, next) => {
    logger.info(req.params.id);
    res.json({});
};

exports.put = (req, res, next) => {
    res.json({});
};

exports.delete = (req, res, next) => {
    res.json({});
};
