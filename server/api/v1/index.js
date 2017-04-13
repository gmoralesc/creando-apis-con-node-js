"use strict";

var router = require("express").Router();
var postRoutes = require("./posts/posts-routes");

router.use("/posts", postRoutes);

module.exports = router;
