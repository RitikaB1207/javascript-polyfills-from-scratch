// Map() transforms each element of an array and returns a new array with the transformed elements. It does not modify the original array elements.
//It is a higher-order function that takes a callback function as an argument. The callback function is applied to each element of the array, and the result is stored in a new array and it does not mutate the original array.
// The map() method is commonly used for tasks such as transforming data, extracting specific properties from objects, or performing calculations on array elements.
//It preserves the original array's length, including empty slots

//Basic Example - using map() method
const number = [1, 2, 3, 4];

const results = number.map((num) => {
  return num * 2;
});

console.log(results);// [2, 4, 6, 8]
console.log(number); //[1,2,3,4]

//writing map function from scratch:
Array.prototype.myMap = function ( callback) {
    const result = [];
    for(let i=0 ; i<this.length ; i++){
        result.push(callback(this[i] , i , this));
    }

    return result;
};

const numbers = [ 1,2,3,4];
const result = numbers.myMap((num) => num*2);
console.log(result);
console.log(numbers);


//edge cases

Array.prototype.myMap = function (callback, thisArg) {
  // 1. Validate callback
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  // 2. Store the original array
  const arr = this;

  // 3. Create a new array with the same length
  const result = new Array(arr.length);

  // 4. Iterate through the array
  for (let i = 0; i < arr.length; i++) {

    // 5. Skip missing indexes
    if (i in arr) {

      // 6. Execute callback and store result
      result[i] = callback.call(
        thisArg,
        arr[i],
        i,
        arr
      );
    }
  }

  // 7. Return new array
  return result;
};

// three tasks to test my understanding 
Array.prototype.myMap = function (callback, thisArg) {
    const result = [];

    for (let i = 0; i < this.length; i++) {
        result.push(callback.call(thisArg, this[i], i, this));
    }
    return result;
};

console.log("Task 1 :");
//Task - 1
const numbers = [2, 4, 6, 8, 10];
const result = numbers.myMap( (num) => num * 3);

console.log(result);  //[ 6, 12, 18, 24, 30 ]
console.log(numbers); // [ 2, 4, 6, 8, 10 ]

console.log("Task 2: ");
//Task -2 
const users = [
  { firstName: "Ritika", lastName: "Barve", age: 26 },
  { firstName: "Amit", lastName: "Sharma", age: 29 },
  { firstName: "Neha", lastName: "Patil", age: 24 }
];

const results = users.myMap((user) => {
   const fullname = `${user.firstName} ${user.lastName}`;
   return {
    fullname,
    age : `${user.age}`,
    message : `${fullname} is ${user.age} years old`
   }
});

console.log(results);

console.log("Task 3: For each price, you need to Start with the discount in discount.percentage—that’s 10%. Add the price’s index to the discount percentage. Subtract that discount from the price. Return the discounted price in a new array.");
//Task -3 

const prices = [100, 200, 300, 400];

const discount = {
  percentage: 10
};

const discountedPrices = prices.myMap(function (price, index) {
  const adjustedPercentage = this.percentage + index;
  return price * (1 - adjustedPercentage / 100);
}, discount);

console.log(discountedPrices);
