// Pure functions are functions that do not depend on external state and always return the same result for the same inputs.
function sum(a, b) {
  return a + b;
}

function concatStrings(string1, string2) {
  return string1.concat(string2);
}

// Purifying a function. It returns a new object, not mutates the original
export function addItem_Pure(cart, product) {
  return [...cart, product];
}

