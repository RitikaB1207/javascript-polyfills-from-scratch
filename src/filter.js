//filter() is a built-in JavaScript array method that creates a new array containing only the elements that pass a condition.
// Basic example:
const numbers = [1, 2, 3, 4, 5, 6];

const result = numbers.filter((num) => {
    return num % 2 === 0;
});

console.log(result); // [2, 4, 6]

//"map() is used when we want to transform every element of an array and return a new array. filter() is used when we want to select specific elements based on a condition. Map returns transformed values, whereas filter returns the original elements that satisfy the condition."

//our implementation of filter() method from scratch:
Array.prototype.myFilter = function(callback, thisArg){

    if(typeof callback !== "function"){
        throw new TypeError("callback must be a function");
    }
    const result = [];

    for(let i=0 ; i<this.length; i++){
        
        if(i in this){
            if(callback.call(thisArg, this[i] , i , this)){
                result.push(this[i]);
            }
        }
    }
    return result;
}


//Task 1 : Given an array of numbers, return only numbers greater than 10.
const numbers = [5, 12, 8, 20, 3, 15];

const result = numbers.myFilter((num) => {
   return num > 10;
});

console.log(result); // [12, 20, 15]

//Task 2: Given an array of users, return only users whose age is greater than or equal to 25.

const users = [
    { firstName: "Ritika", age: 26 },
    { firstName: "Amit", age: 29 },
    { firstName: "Neha", age: 24 },
    { firstName: "Rahul", age: 22 },
    { firstName: "Priya", age: 27 }
];

const results = users
    .myFilter(user => user.age >=25)
    .map(user => user.firstName);

console.log(results);// Expected: Ritika, Amit, Priya

//Task 3: Understand how thisArg works by filtering products based on a minimum price.
const products = [
    { name: "Laptop", price: 50000 },
    { name: "Mouse", price: 500 },
    { name: "Monitor", price: 12000 },
    { name: "Keyboard", price: 1500 }
];

const filterCriteria = {
    minPrice: 5000
};

// Use myFilter() and filterCriteria as thisArg.
// Expected: Laptop, Monitor

const resultus = products.myFilter( function (product){
    return product >= this.minPrice;
}, filterCriteria);


