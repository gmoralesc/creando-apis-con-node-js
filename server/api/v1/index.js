const router = require('express').Router();

const tasks = require('./tasks/routes');

router.use('/tasks', tasks);

module.exports = router;
