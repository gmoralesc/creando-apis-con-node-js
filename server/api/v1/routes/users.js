"use strict";

const router = require("express").Router();

const controller = require("./../controllers/users");

/*
 * /api/users/     GET    - READ ALL
 * /api/users/     POST   - CREATE
 * /api/users/:id  GET    - READ ONE
 * /api/users/:id  PUT    - UPDATE
 * /api/users/:id  DELETE - DELETE
 */

router.route("/")
    .get(controller.all)
    .post(controller.post);

router.route("/:id")
    .get(controller.get)
    .put(controller.put)
    .delete(controller.delete);

module.exports = router;