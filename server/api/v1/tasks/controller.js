// server/api/v1/tasks/controller.js

exports.create = (req, res, next) => {
  const { body = {} } = req;
  res.json(body);
};

exports.all = (req, res, next) => {
  res.json([]);
};

exports.read = (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;
  res.json({
    id,
  });
};

exports.update = (req, res, next) => {
  const { body = {}, params = {} } = req;
  const { id } = params;
  res.json({
    id,
    body,
  });
};

exports.delete = (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;
  res.json({
    id,
  });
};
