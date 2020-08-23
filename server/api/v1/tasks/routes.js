// server/api/v1/tasks/routes.js

const router = require('express').Router({
  mergeParams: true,
});
const controller = require('./controller');
const { auth, owner } = require('../auth');
const { sanitizers } = require('./model');

/*
 * /api/tasks/ POST - CREATE
 * /api/tasks/ GET - READ ALL
 * /api/tasks/:id GET - READ ONE
 * /api/tasks/:id PUT - UPDATE
 * /api/tasks/:id DELETE - DELETE
 */

router.param('id', controller.id);

/**
 * @swagger
 * definitions:
 *   NewTask:
 *     type: object
 *     required:
 *       - title
 *     properties:
 *       title:
 *         type: string
 *       completed:
 *         type: boolean
 *       description:
 *         type: string
 *       url:
 *         type: string
 *       dueDate:
 *         type: string
 *         format: date-time
 *   Task:
 *     allOf:
 *       - $ref: '#/definitions/NewTask'
 *       - properties:
 *           id:
 *             type: string
 *           created_at:
 *             type: string
 *             format: date-time
 *           update_at:
 *             type: string
 *             format: date-time
 */

router
  .route('/')
  /**
   * @swagger
   * /tasks/:
   *   post:
   *     tags:
   *       - Tasks
   *     description: New task
   *     parameters:
   *       - name: task
   *         description: Task object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/NewTask'
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Task
   *         schema:
   *           $ref: '#/definitions/Task'
   */
  .post(auth, controller.parentId, sanitizers, controller.create)
  /**
   * @swagger
   * /tasks/:
   *   get:
   *     tags:
   *       - Tasks
   *     description: Get all tasks
   *     parameters:
   *       - name: limit
   *         description: Limit number of items
   *         in: query
   *         schema:
   *           type: integer
   *       - name: skip
   *         description: Number of items to skip
   *         in: query
   *         schema:
   *           type: integer
   *       - name: page
   *         description: Number of the page
   *         in: query
   *         schema:
   *           type: integer
   *       - name: sortBy
   *         description: Sort by field name
   *         in: query
   *         schema:
   *           type: string
   *       - name: direction
   *         description: Sort order
   *         in: query
   *         schema:
   *           type: string
   *           enum: [asc, desc]
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Task
   *         schema:
   *           type: object
   *           properties:
   *             success:
   *               type: boolean
   *             data:
   *               type: array
   *               items:
   *                 $ref: '#/definitions/Task'
   *             meta:
   *               type: object
   *               properties:
   *                 limit:
   *                   type: integer
   *                   example: 10
   *                 skip:
   *                   type: integer
   *                   example: 0
   *                 total:
   *                   type: integer
   *                   example: 1
   *                 page:
   *                   type: integer
   *                   example: 1
   *                 pages:
   *                   type: integer
   *                   example: 1
   *                 sortyBy:
   *                   type: string
   *                   example: created_at
   *                 direction:
   *                   type: string
   *                   example: desc
   */
  .get(auth, controller.parentId, controller.all);

router
  .route('/:id')
  /**
   * @swagger
   *
   * /tasks/{id}:
   *   get:
   *     tags:
   *       - Tasks
   *     description: Get a task
   *     parameters:
   *       - name: id
   *         in: path
   *         description: Task id
   *         required: true
   *         type: string
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Task
   *         schema:
   *           $ref: '#/definitions/Task'
   */
  .get(auth, controller.parentId, controller.read)
  /**
   * @swagger
   * /tasks/{id}:
   *   put:
   *     tags:
   *       - Tasks
   *     description: Update a Task
   *     parameters:
   *       - name: id
   *         in: path
   *         description: Task id
   *         required: true
   *         type: string
   *       - name: task
   *         description: Post object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/NewTask'
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Task
   *         schema:
   *           $ref: '#/definitions/Task'
   */
  .put(auth, owner, controller.parentId, sanitizers, controller.update)
  /**
   * @swagger
   * /tasks/{id}:
   *   delete:
   *     tags:
   *       - Tasks
   *     description: Delete a task
   *     parameters:
   *       - name: id
   *         in: path
   *         description: Task id
   *         required: true
   *         type: string
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Task
   *         schema:
   *           $ref: '#/definitions/Task'
   */
  .delete(auth, owner, controller.parentId, controller.delete);

module.exports = router;
