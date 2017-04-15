"use strict";

const router = require("express").Router();

const usersRoutes = require("./routes/users");

router.use("/users", usersRoutes);

module.exports = router;