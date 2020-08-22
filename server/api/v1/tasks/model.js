// server/api/v1/tasks/model.js

const mongoose = require('mongoose');

const task = {
  title: String,
  description: String,
  completed: Boolean,
  url: String,
  dueDate: Date,
};

module.exports = mongoose.model('task', task);
