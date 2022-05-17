const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.lineSymbols = [];
  }

  _transform(chunk, encoding, callback) {
    const text = chunk.toString('utf-8');
    text.split('').forEach( (symbol) => {
      symbol === os.EOL ? this.push(this._getLine()) : this.lineSymbols.push(symbol);
    });
    callback();
  }

  _flush(callback) {
    callback(null, this._getLine());
  }

  _getLine() {
    const line = this.lineSymbols.join('');
    this.lineSymbols = [];
    return line;
  }
}

module.exports = LineSplitStream;
