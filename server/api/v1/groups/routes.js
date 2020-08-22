// server/api/v1/groups/routes.js

const router = require('express').Router();
const controller = require('./controller');
const { auth, owner } = require('../auth');

/*
 * /api/groups/ POST - CREATE
 * /api/groups/ GET - READ ALL
 * /api/groups/:id GET - READ ONE
 * /api/groups/:id PUT - UPDATE
 * /api/groups/:id DELETE - DELETE
 */

router.route('/').post(auth, controller.create).get(auth, controller.all);

router.param('id', controller.id);

router
  .route('/:id')
  .get(auth, controller.read)
  .put(auth, owner, controller.update)
  .delete(auth, owner, controller.delete);

module.exports = router;
