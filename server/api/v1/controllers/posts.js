"use strict";

const logger = require("winston");
const _ = require("lodash");

const Post = require("./../schemas/posts");

exports.params = (req, res, next, id) => {
    Post.findById(id)
        .then( post => {
            if (post) {
                req.post = post;
                next();
            } else {
                res.json({
                    "message": "Post not found"
                });
            }
        })
        .catch( err => {
            next(new Error(err));
        });
};

exports.all = (req, res, next) => {
    Post.find()
        .then( posts => {
            res.json(posts);
        })
        .catch( err => {
            next(new Error(err));
        });
};

exports.post = (req, res, next) => {
    let body = req.body;
    // Sanatize input

    const post = new Post(body);
    
    post.save()
        .then( newpost => {
            res.json(newpost);
        })
        .catch( err => {
            next(new Error(err));
        });
};

exports.get = (req, res, next) => {
    const post = req.post;

    res.json(post);
};

exports.put = (req, res, next) => {
    const body = req.body;
    //Sanatize input 
    
    const post = _.merge(req.post, body);

    post.save()
        .then( updated => {
            res.json(updated);
        })
        .catch( err => {
            next(new Error(err));
        });
};

exports.delete = (req, res, next) => {
    const post = req.post;
    
    post.remove()
        .then(removed => {
            res.json(removed);
        })
        .catch( err => {
            next(err);
        });
};