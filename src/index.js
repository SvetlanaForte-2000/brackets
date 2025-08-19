module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const pairs = {};

  bracketsConfig.forEach(function buildPairs(pair) {
    const [open, close] = pair;
    pairs[close] = open;
  });

  let isValid = true;

  str.split('').forEach(function processChar(char) {
    if (!isValid) return;

    const top = stack[stack.length - 1];

    if (pairs[char] === char) {
      if (top === char) {
        stack.pop();
      } else {
        stack.push(char);
      }
    } else if (!pairs[char]) {
      stack.push(char);
    } else if (top === pairs[char]) {
      stack.pop();
    } else {
      isValid = false;
    }
  });

  return isValid && stack.length === 0;
};
