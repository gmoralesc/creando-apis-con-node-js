"use strict";

const logger = require("winston");
const _ = require("lodash");

const Category = require("./../schemas/categories");

exports.params = (req, res, next, id) => {
    Category.findById(id)
        .then( category => {
            if (category) {
                req.category = category;
                next();
            } else {
                res.json({
                    "message": "Category not found"
                });
            }
        })
        .catch( err => {
            next(new Error(err));
        });
};

exports.all = (req, res, next) => {
    Category.find()
        .then( categories => {
            res.json(categories);
        })
        .catch( err => {
            next(new Error(err));
        });
};

exports.post = (req, res, next) => {
    let body = req.body;
    // Sanatize input

    const category = new Category(body);
    
    category.save()
        .then( newcategory => {
            res.json(newcategory);
        })
        .catch( err => {
            next(new Error(err));
        });
};

exports.get = (req, res, next) => {
    const category = req.category;

    res.json(category);
};

exports.put = (req, res, next) => {
    const body = req.body;
    //Sanatize input 
    
    const category = _.merge(req.category, body);

    category.save()
        .then( updated => {
            res.json(updated);
        })
        .catch( err => {
            next(new Error(err));
        });
};

exports.delete = (req, res, next) => {
    const category = req.category;
    
    category.remove()
        .then(removed => {
            res.json(removed);
        })
        .catch( err => {
            next(err);
        });
};