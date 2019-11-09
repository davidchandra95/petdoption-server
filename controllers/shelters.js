exports.fetchAll = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, data: { message: 'show all bootcamps' } });
};

exports.getByID = (req, res, next) => {
  res
    .status(200)
    .json({
      success: true,
      data: { message: `Get bootcamp ${req.params.id}` }
    });
};

exports.save = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, data: { message: 'Create new bootcamp' } });
};

exports.update = (req, res, next) => {
  res
    .status(200)
    .json({
      success: true,
      data: { message: `Update bootcamp ${req.params.id}` }
    });
};

exports.remove = (req, res, next) => {
  res
    .status(200)
    .json({
      success: true,
      data: { message: `Delete ${req.params.id} bootcamp` }
    });
};
