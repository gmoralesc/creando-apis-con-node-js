const mongoose = require('mongoose');

const task = {
  title: String,
  completed: Boolean,
  description: String,
  url: String,
  dueDate: Date,
};

module.exports = mongoose.model('task', task);
