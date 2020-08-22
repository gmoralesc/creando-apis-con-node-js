// server/api/v1/users/routes.js

const router = require('express').Router();
const tasksRouter = require('../tasks/routes');
const controller = require('./controller');
const { auth, me } = require('../auth');
const { sanitizers } = require('./model');

/*
 * /api/users/ GET - READ ALL
 * /api/users/signup POST - CREATE
 * /api/users/signin POST - LOGIN
 * /api/users/:id GET - READ ONE
 * /api/users/:id PUT - UPDATE
 * /api/users/:id DELETE - DELETE
 */

router.param('id', controller.id);

router.route('/').get(controller.all);

router.route('/signup').post(sanitizers, controller.signup);
router.route('/signin').post(sanitizers, controller.signin);

router
  .route('/:id')
  .get(auth, me, controller.read)
  .put(auth, me, sanitizers, controller.update)
  .delete(auth, me, controller.delete);

router.use('/:userId/tasks', tasksRouter);

module.exports = router;
