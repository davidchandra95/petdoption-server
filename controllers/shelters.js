const Shelter = require('../models/Shelter');
const HttpStatus = require('http-status-codes');
const ErrorResponse = require('../utils/errorResponse');

exports.fetchAll = async (req, res, next) => {
  try {
    const shelters = await Shelter.find();
    res
      .status(HttpStatus.OK)
      .json({ success: true, data: { shelters, count: shelters.length } });
  } catch (err) {
    return next(err);
  }
};

exports.getByID = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

exports.save = async (req, res, next) => {
  try {
    const shelter = await Shelter.create(req.body);

    res.status(HttpStatus.OK).json({ success: true, data: { shelter } });
  } catch (err) {
    return next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
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
  } catch (err) {
    return next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
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
  } catch (err) {
    return next(err);
  }
};
