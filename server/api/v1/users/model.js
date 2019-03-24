const mongoose = require('mongoose');
const { hash, compare } = require('bcryptjs');
const validator = require('validator');
const { body } = require('express-validator/check');

const { Schema } = mongoose;

const fields = {
  firstname: {
    type: String,
    required: true,
    trim: true,
    maxlength: 64,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    maxlength: 64,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: props => `${props.value} is not a valid email`,
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 6,
  },
};

const user = new Schema(fields, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
});

user
  .virtual('name')
  .get(function getName() {
    return `${this.firstname} ${this.lastname}`;
  })
  .set(function setName(name) {
    const [firstname = '', lastname = ''] = name.split(' ');
    this.firstname = firstname;
    this.lastname = lastname;
  });

const blacklistFields = ['password'];

user.methods.toJSON = function toJSON() {
  const doc = this.toObject();
  blacklistFields.forEach((field) => {
    if (Object.hasOwnProperty.call(doc, field)) {
      delete doc[field];
    }
  });
  return doc;
};

user.pre('save', async function save(next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
  next();
});

user.methods.verifyPassword = function verifyPassword(password) {
  return compare(password, this.password);
};

const sanitizers = [
  body('email')
    .isEmail()
    .normalizeEmail(),
];

module.exports = {
  Model: mongoose.model('user', user),
  fields,
  sanitizers,
};
