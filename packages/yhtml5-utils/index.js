'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cmd/index.min.js');
} else {
  module.exports = require('./cmd/index.js');
}
