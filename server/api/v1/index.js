"use strict";

var router = require("express").Router();
var userRoutes = require("./users/users-routes");
var postRoutes = require("./posts/posts-routes");
var categoryRoutes = require("./categories/categories-routes");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/categories", categoryRoutes);

module.exports = router;
