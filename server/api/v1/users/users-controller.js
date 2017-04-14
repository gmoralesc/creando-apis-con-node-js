"use strict";

const logger = require("winston");
const User = require("./users-model");
const _ = require("lodash");

exports.params = (req, res, next, id) => {
    User.findById(id)
        .then(user => {
            if (!user) { 
                next(new Error("No user found")); 
            } else {
                req.user = user;
                next();
            }
        })
        .catch(err => {
            next(err);
        });
};

exports.all = (req, res, next) => {
    User.find({})
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            next(err);
        });
};

exports.post = (req, res, next) => {
    let newUser = new User(req.body);
    newUser.save()
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            next(err);
        });
};

exports.get = (req, res, next) => {
    res.json(req.user);
};

exports.put = (req, res, next) => {
    let user = req.user;
    let update = req.body;

    _.merge(user, update);

    user.save()
        .then( updated => {
            res.json(updated);
        })
        .catch( err => {
            next(err);
        });
};

exports.delete = (req, res, next) => {
    const user = req.user;
    user.remove()
        .then(removed => {
            res.json(removed);
        })
        .catch( err => {
            next(err);
        });
};
