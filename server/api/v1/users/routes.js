const router = require('express').Router();

const controller = require('./controller');
const tasksRouter = require('./../tasks/routes');

router.param('id', controller.id);

router.route('/').get(controller.all);

router.route('/signup').post(controller.signup);
router.route('/signin').post(controller.signin);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

router.use('/:userId/tasks', tasksRouter);

module.exports = router;
