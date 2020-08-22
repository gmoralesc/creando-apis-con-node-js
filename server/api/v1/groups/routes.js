// server/api/v1/groups/routes.js

const router = require('express').Router();
const controller = require('./controller');

/*
 * /api/groups/ POST - CREATE
 * /api/groups/ GET - READ ALL
 * /api/groups/:id GET - READ ONE
 * /api/groups/:id PUT - UPDATE
 * /api/groups/:id DELETE - DELETE
 */

router.route('/').post(controller.create).get(controller.all);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
