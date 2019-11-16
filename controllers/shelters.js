const Shelter = require('../models/Shelter');
const HttpStatus = require('http-status-codes');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

exports.fetchAll = asyncHandler(async (req, res, next) => {
  const shelters = await Shelter.find();
  res
    .status(HttpStatus.OK)
    .json({ success: true, data: { shelters, count: shelters.length } });
});

exports.getByID = asyncHandler(async (req, res, next) => {
  const shelter = await Shelter.findById(req.params.id);

  if (!shelter) {
    return next(
      new ErrorResponse(
        `shelter with ${req.params.id} id doesn't exists`,
        HttpStatus.NOT_FOUND
      )
    );
  }
  res.status(HttpStatus.OK).json({ success: true, data: { shelter } });
});

exports.save = asyncHandler(async (req, res, next) => {
  const shelter = await Shelter.create(req.body);

  res.status(HttpStatus.OK).json({ success: true, data: { shelter } });
});

exports.update = asyncHandler(async (req, res, next) => {
  const shelter = await Shelter.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!shelter) {
    return next(
      new ErrorResponse(
        `shelter with ${req.params.id} id doesn't exists`,
        HttpStatus.NOT_FOUND
      )
    );
  }
  res.status(HttpStatus.OK).json({ success: true, data: { shelter } });
});

exports.remove = asyncHandler(async (req, res, next) => {
  const shelter = await Shelter.findByIdAndDelete(req.params.id);

  if (!shelter) {
    return next(
      new ErrorResponse(
        `shelter with ${req.params.id} id doesn't exists`,
        HttpStatus.NOT_FOUND
      )
    );
  }
  res.status(HttpStatus.OK).json({ success: true, data: {} });
});
