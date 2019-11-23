const Shelter = require('../models/Shelter');
const HttpStatus = require('http-status-codes');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const geocoder = require('../utils/geocoder');

exports.fetchAll = asyncHandler(async (req, res, next) => {
  let query;
  const reqQuery = { ...req.query };
  const removeFields = ['select', 'sort'];

  removeFields.forEach(param => delete reqQuery[param]);
  console.log(reqQuery);
  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  query = Shelter.find(JSON.parse(queryStr));

  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  const shelters = await query;
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

// @desc        Get shelter within radius
// @route       GET /api/v1/shelters/radius/:zipcode/:distance
// @access      Private
exports.getWithinRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // get lat-lang from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  const radius = distance / 1000 / 6378;
  const shelters = await Shelter.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(HttpStatus.OK).json({
    success: true,
    count: shelters.length,
    data: { shelters }
  });
});
