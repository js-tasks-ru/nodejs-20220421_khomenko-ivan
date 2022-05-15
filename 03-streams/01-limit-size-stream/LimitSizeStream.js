const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.limit = options.limit;
    this.dataVolume = 0;
  }

  _transform(chunk, encoding, callback) {
    this.dataVolume += Buffer.byteLength(chunk, encoding);
    if (this.dataVolume <= this.limit) {
      callback(null, chunk);
    } else {
      this.emit('error', new LimitExceededError('Limit has been exceded'));
      return;
    }
  }
}

module.exports = LimitSizeStream;
