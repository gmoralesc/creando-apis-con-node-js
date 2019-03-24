exports.all = (req, res, next) => {
  res.json([]);
};

exports.create = (req, res, next) => {
  res.json(req.body);
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
