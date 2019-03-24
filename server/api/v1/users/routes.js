const router = require('express').Router();

const controller = require('./controller');
const tasksRouter = require('./../tasks/routes');
const { auth, me } = require('./../auth');

router.param('id', controller.id);

router.route('/').get(controller.all);

router.route('/signup').post(controller.signup);
router.route('/signin').post(controller.signin);

router
  .route('/:id')
  .get(auth, me, controller.read)
  .put(auth, me, controller.update)
  .delete(auth, me, controller.delete);

router.use('/:userId/tasks', tasksRouter);

module.exports = router;
