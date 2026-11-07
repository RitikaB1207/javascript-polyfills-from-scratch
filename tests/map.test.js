
const assert = require("node:assert/strict");
require("../src/map");

// Test 1: Basic transformation
assert.deepEqual(
  [1, 2, 3].myMap((num) => num * 2),
  [2, 4, 6]
);

// Test 2: Callback receives index
assert.deepEqual(
  ["a", "b", "c"].myMap((value, index) => {
    return `${index}-${value}`;
  }),
  ["0-a", "1-b", "2-c"]
);

// Test 3: Original array is unchanged
const original = [1, 2, 3];

original.myMap((num) => num * 2);

assert.deepEqual(original, [1, 2, 3]);

// Test 4: Empty array
assert.deepEqual(
  [].myMap((num) => num * 2),
  []
);

// Test 5: Sparse array
const sparse = [1, , 3];

const sparseResult = sparse.myMap((num) => num * 2);

assert.equal(sparseResult.length, 3);
assert.equal(1 in sparseResult, false);
assert.equal(sparseResult[2], 6);

// Test 6: Callback must be a function
assert.throws(
  () => [1, 2, 3].myMap(123),
  TypeError
);

// Test 7: thisArg
const multiplier = { factor: 10 };

assert.deepEqual(
  [1, 2, 3].myMap(function (num) {
    return num * this.factor;
  }, multiplier),
  [10, 20, 30]
);

console.log("All map tests passed!");
