const Model = require('./model');

exports.all = async (req, res, next) => {
  try {
    const docs = await Model.find().exec();
    res.json(docs);
  } catch (err) {
    next(new Error(err));
  }
};

exports.create = async (req, res, next) => {
  const { body = {} } = req;
  const document = new Model(body);

  try {
    const doc = await document.save();
    res.status(201);
    res.json(doc);
  } catch (err) {
    next(new Error(err));
  }
};

exports.read = (req, res, next) => {
  res.json({
    _id: req.params.id,
  });
};

exports.update = (req, res, next) => {
  res.json({
    _id: req.params.id,
    item: req.body,
  });
};

exports.delete = (req, res, next) => {
  res.json({
    _id: req.params.id,
  });
};
