const router = require('express').Router({
  mergeParams: true,
});

const controller = require('./controller');
const { auth } = require('./../auth');
const { sanitizers } = require('./model');

/*
 * /api/tasks/ POST - CREATE
 * /api/tasks/ GET - READ ALL
 * /api/tasks/:id GET - READ ONE
 * /api/tasks/:id PUT - UPDATE
 * /api/tasks/:id DELETE - DELETE
 */

router.param('id', controller.id);

router
  .route('/')
  .post(auth, controller.parentId, sanitizers, controller.create)
  .get(auth, controller.parentId, controller.all);

router
  .route('/:id')
  .get(auth, controller.parentId, controller.read)
  .put(auth, controller.parentId, sanitizers, controller.update)
  .delete(auth, controller.parentId, controller.delete);

module.exports = router;
