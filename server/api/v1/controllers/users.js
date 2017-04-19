"use strict";

const logger = require("winston");
const _ = require("lodash");

const User = require("./../schemas/users");

exports.params = (req, res, next, id) => {
    User.findById(id)
        .then( user => {
            if (user) {
                req.user = user;
                next();
            } else {
                res.json({
                    "message": "User not found"
                });
            }
        })
        .catch( err => {
            next(new Error(err));
        });
};

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

    const user = new User(body);
    
    user.save()
        .then( newuser => {
            res.json(newuser);
        })
        .catch( err => {
            next(new Error(err));
        });
};

exports.get = (req, res, next) => {
    const user = req.user;

    res.json(user);
};

exports.put = (req, res, next) => {
    const body = req.body;
    //Sanatize input 
    
    const user = _.merge(req.user, body);

    user.save()
        .then( updated => {
            res.json(updated);
        })
        .catch( err => {
            next(new Error(err));
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