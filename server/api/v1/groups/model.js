const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 128,
  },
};

const references = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
};

const group = new Schema(Object.assign(fields, references), {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
});

const virtuals = {
  tasks: {
    ref: 'task',
    localField: '_id',
    foreignField: 'groupId',
  },
};

group.virtual('tasks', virtuals.tasks);

module.exports = {
  Model: mongoose.model('group', group),
  fields,
  references,
  virtuals,
};
