exports.fetchAll = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, data: { message: 'show all shelters' } });
};

exports.getByID = (req, res, next) => {
  res
    .status(200)
    .json({
      success: true,
      data: { message: `Get shelter ${req.params.id}` }
    });
};

exports.save = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, data: { message: 'Create new shelter' } });
};

exports.update = (req, res, next) => {
  res
    .status(200)
    .json({
      success: true,
      data: { message: `Update shelter ${req.params.id}` }
    });
};

exports.remove = (req, res, next) => {
  res
    .status(200)
    .json({
      success: true,
      data: { message: `Delete ${req.params.id} shelter` }
    });
};
