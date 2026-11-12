Array.prototype.myReduce = function(callback, initialValue) {

    if (typeof callback !== "function") {
        throw new TypeError("Callback must be a function");
    }

    let accumulator;
    let startIndex = 0;

    // Check whether initialValue was provided
    if (arguments.length > 1) {
        accumulator = initialValue;
    } else {

        // Find the first existing element
        while (startIndex < this.length && !(startIndex in this)) {
            startIndex++;
        }

        // No initialValue and no available elements
        if (startIndex >= this.length) {
            throw new TypeError("Reduce of empty array with no initial value");
        }

        accumulator = this[startIndex];
        startIndex++;
    }

    // Iterate through remaining elements
    for (let i = startIndex; i < this.length; i++) {

        if (i in this) {
            accumulator = callback(accumulator, this[i], i, this);
        }
    }

    return accumulator;
};

//One important interview distinction: Unlike map() and filter(), reduce() does not accept a thisArg parameter. Its second argument is the initialValue.

//Task 1 : Given an array of numbers, calculate their total using myReduce().

const numbers = [10, 20, 30, 40, 50];

const result = numbers.myReduce( (acc, curr) => {
    return acc + curr;
},0);

console.log(result);

//Task 2: Given an array of users, count how many users belong to each city.
const users = [
    { name: "Ritika", city: "Mumbai" },
    { name: "Amit", city: "Pune" },
    { name: "Neha", city: "Mumbai" },
    { name: "Rahul", city: "Delhi" },
    { name: "Priya", city: "Mumbai" },
    { name: "Karan", city: "Pune" }
];

const output = users.myReduce( function ( acc,curr){
    if(acc[curr.city]){
        acc[curr.city] = ++ acc[curr.city];
    }else{
        acc[curr.city] = 1;
    }
    return acc;
} , {});

console.log(output);

// Expected output:
// {
//     Mumbai: 3,
//     Pune: 2,
//     Delhi: 1
// }


//Task 3 : You have a shopping cart containing products, their prices and quantities.
//Calculate the final cart amount, including a 10% discount if the subtotal is greater than ₹5,000.
const cart = [
    { name: "Laptop", price: 50000, quantity: 1 },
    { name: "Mouse", price: 500, quantity: 2 },
    { name: "Keyboard", price: 1500, quantity: 1 },
    { name: "Monitor", price: 12000, quantity: 1 }
];

const subtotal = cart.myReduce((total, product) => {
    return total + product.price * product.quantity;
}, 0);

const finalAmount = subtotal > 5000 ? subtotal * 0.9 : subtotal;
console.log(finalAmount);


