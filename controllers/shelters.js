const Shelter = require('../models/Shelter');
const HttpStatus = require('http-status-codes');

exports.fetchAll = async (req, res, next) => {
  try {
    const shelters = await Shelter.find();
    res
      .status(HttpStatus.OK)
      .json({ success: true, data: { shelters, count: shelters.length } });
  } catch (err) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ success: false, message_error: err.message });
  }
};

exports.getByID = async (req, res, next) => {
  try {
    const shelter = await Shelter.findById(req.params.id);

    if (!shelter) {
      return res
        .status(HttpStatus.OK)
        .json({ success: false, message_error: 'shelter not found.' });
    }
    res.status(HttpStatus.OK).json({ success: true, data: { shelter } });
  } catch (err) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ success: false, message_error: err.message });
  }
};

exports.save = async (req, res, next) => {
  try {
    const shelter = await Shelter.create(req.body);

    res.status(HttpStatus.OK).json({ success: true, data: { shelter } });
  } catch (err) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ success: false, message_error: err.message });
  }
};

exports.update = async (req, res, next) => {
  try {
    const shelter = await Shelter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!shelter) {
      return res
        .status(HttpStatus.OK)
        .json({ success: false, message_error: `shelter doesn't exists.` });
    }
    res.status(HttpStatus.OK).json({ success: true, data: { shelter } });
  } catch (err) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ success: false, message_error: err.message });
  }
};

exports.remove = async (req, res, next) => {
  try {
    const shelter = await Shelter.findByIdAndDelete(req.params.id);

    if (!shelter) {
      return res
        .status(HttpStatus.OK)
        .json({ success: false, message_error: `shelter doesn't exists.` });
    }
    res.status(HttpStatus.OK).json({ success: true, data: {} });
  } catch (err) {
    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ success: false, message_error: err.message });
  }
};
