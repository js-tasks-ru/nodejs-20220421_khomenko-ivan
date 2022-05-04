function sum(a, b) {
  const result = a + b;
  if (typeof result === 'number') {
    return result;
  }
  throw new TypeError('Its not a number');
}

module.exports = sum;
