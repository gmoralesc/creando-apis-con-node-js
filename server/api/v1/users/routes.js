// server/api/v1/users/routes.js

const router = require('express').Router();
const tasksRouter = require('../tasks/routes');
const controller = require('./controller');

/*
 * /api/users/ POST - CREATE
 * /api/users/ GET - READ ALL
 * /api/users/:id GET - READ ONE
 * /api/users/:id PUT - UPDATE
 * /api/users/:id DELETE - DELETE
 */

router.route('/').post(controller.create).get(controller.all);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

router.use('/:userId/tasks', tasksRouter);

module.exports = router;
