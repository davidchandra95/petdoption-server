const NodeGeocoder = require('node-geocoder');
const options = {
  provider: 'mapquest',
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'dRuEeI6k4f6wTsycJOSAPJT04l3syPv6', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
