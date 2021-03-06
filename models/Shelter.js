const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');
const HttpStatus = require('http-status-codes');
const ErrorResponse = require('../utils/errorResponse');

const ShelterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters']
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [200, 'Description can not be more than 200 characters']
    },
    website: {
      type: String
      // match: [
      //   /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm,
      //   'Please use a valid URL with HTTP or HTTPS'
      // ]
    },
    phone: {
      type: String,
      maxlength: [20, 'Phone number can not be longer than 20 characters']
    },
    email: {
      type: String,
      match: [
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        'Please add a valid email'
      ]
    },
    address: {
      type: String,
      required: [true, 'Please add an address']
    },
    location: {
      // GeoJSON point
      type: {
        type: String,
        enum: ['Point']
        // required: true
      },
      coordinates: {
        type: [Number],
        // required: true,
        index: '2dsphere'
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String
    },
    pet: {
      type: [String],
      required: true,
      enum: ['Dog', 'Cat', 'Other']
    },
    averageRating: {
      type: Number,
      min: [1, 'Rating must be atleast 1'],
      max: [10, 'Rating can not be more than 10']
    },
    averageCost: Number,
    photo: {
      type: String,
      default: 'no-photo.jpg'
    }
  },
  { timestamps: true }
);

// create shelter slug from inputed name
ShelterSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// create shelter's location field
ShelterSchema.pre('save', async function(next) {
  let loc = await geocoder.geocode(this.address);
  if (loc.length > 0) {
    loc = loc[0];
    if (loc.countryCode !== 'ID') {
      return next(
        new ErrorResponse(`Address not found`, HttpStatus.BAD_GATEWAY)
      );
    }
    this.location = {
      type: 'Point',
      coordinates: [loc.longitude, loc.latitude],
      formattedAddress: loc.formattedAddress,
      street: loc.streetName,
      city: loc.city,
      state: loc.stateCode,
      zipcode: loc.zipcode,
      country: loc.countryCode
    };
  }

  next();
});

module.exports = mongoose.model('Shelter', ShelterSchema);
