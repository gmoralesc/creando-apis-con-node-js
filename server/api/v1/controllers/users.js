"use strict";

const logger = require("winston");

const User = require("./../schemas/users");

exports.all = (req, res, next) => {
    User.find()
        .then( users => {
            res.json(users);
        })
        .catch( err => {
            next(new Error(err));
        });
};

exports.post = (req, res, next) => {
     let body = req.body;
    // Sanatize input

    let newUser = new User(body);
    newUser.save()
        .then( user => {
            res.json(user);
        })
        .catch( err => {
            next(new Error(err));
        });
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