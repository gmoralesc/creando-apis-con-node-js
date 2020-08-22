// server/api/v1/tasks/model.js

const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 128,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default: '',
    trim: true,
    maxlength: 255,
  },
  url: {
    type: String,
    default: '',
    trim: true,
  },
  dueDate: {
    type: Date,
    default: null,
  },
};

const task = new Schema(fields, {
  timestamps: true,
});

module.exports = mongoose.model('task', task);
