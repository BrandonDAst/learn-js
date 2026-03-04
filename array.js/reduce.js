// Case 01 - Sum
let numbers = [1, 2, 3, 4, 5]
let sumByReduce = numbers.reduce((acc, curr) => acc + curr, 0);

// Count instances
let fruits = ["apple", "grape", "orange", "banana", "apple", "lemon", "watermelon", "orange"]

let fruitCounter = fruits.reduce((acc, curr) => {
  if (acc[curr]) acc[curr]++;
  else acc[curr] = 1;
  return acc;
}, {})

console.log(fruitCounter)