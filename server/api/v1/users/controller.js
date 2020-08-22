// server/api/v1/users/controller.js

const { Model, fields } = require('./model');
const { signToken } = require('../auth');
const { paginationParseParams } = require('../../../utils');
const { sortParseParams, sortCompactToStr } = require('../../../utils');

exports.id = async (req, res, next, id) => {
  try {
    const doc = await Model.findById(id).exec();
    if (!doc) {
      const message = `${Model.modelName} not found`;

      next({
        message,
        statusCode: 404,
        level: 'warn',
      });
    } else {
      req.doc = doc;
      next();
    }
  } catch (err) {
    next(new Error(err));
  }
};

exports.signup = async (req, res, next) => {
  const { body = {} } = req;
  const document = new Model(body);

  try {
    const doc = await document.save();
    const { _id } = doc;
    const token = signToken({ _id });

    res.status(201);
    res.json({
      success: true,
      data: doc,
      meta: {
        token,
      },
    });
  } catch (err) {
    next(new Error(err));
  }
};

exports.signin = async (req, res, next) => {
  const { body = {} } = req;
  const { email = '', password = '' } = body;

  try {
    const user = await Model.findOne({ email }).exec();
    if (!user) {
      const message = 'Email or password are invalid';

      return next({
        success: false,
        message,
        statusCode: 401,
        level: 'info',
      });
    }

    const verified = await user.verifyPassword(password);
    if (!verified) {
      const message = 'Email or password are invalid';

      return next({
        success: false,
        message,
        statusCode: 401,
        level: 'info',
      });
    }

    const { _id } = user;
    const token = signToken({ _id });
    return res.json({
      success: true,
      data: user,
      meta: {
        token,
      },
    });
  } catch (error) {
    return next(new Error(error));
  }
};

exports.all = async (req, res, next) => {
  const { query = {} } = req;
  const { limit, page, skip } = paginationParseParams(query);
  const { sortBy, direction } = sortParseParams(query, fields);

  const all = Model.find({})
    .sort(sortCompactToStr(sortBy, direction))
    .skip(skip)
    .limit(limit);
  const count = Model.countDocuments();

  try {
    const data = await Promise.all([all.exec(), count.exec()]);
    const [docs, total] = data;
    const pages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: docs,
      meta: {
        limit,
        skip,
        total,
        page,
        pages,
        sortBy,
        direction,
      },
    });
  } catch (err) {
    next(new Error(err));
  }
};

exports.read = async (req, res, next) => {
  const { doc = {} } = req;

  res.json({
    success: true,
    data: doc,
  });
};

exports.update = async (req, res, next) => {
  const { doc = {}, body = {} } = req;

  Object.assign(doc, body);

  try {
    const updated = await doc.save();
    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    next(new Error(err));
  }
};

exports.delete = async (req, res, next) => {
  const { doc = {} } = req;

  try {
    const removed = await doc.remove();
    res.json({
      success: true,
      data: removed,
    });
  } catch (err) {
    next(new Error(err));
  }
};
