# javascript-polyfills-from-scratch

JS Task : Write map, filter, reduce, call, apply, bind from scratch, with a test for each.

# JavaScript Interview Preparation – Array Methods & Function Methods

A complete interview revision guide for:

1. `map()`
2. `filter()`
3. `reduce()`
4. `call()`
5. `apply()`
6. `bind()`

---

# 1. Array.prototype.map()

## 1.1 What is map()?

**Interview answer:**

`map()` is a higher-order array method that iterates over an array, executes a callback function on every existing element and returns a new array containing the transformed values.

It does not modify the original array.

**Syntax:**

```javascript
array.map(callback(currentValue, index, array), thisArg);
```

## 1.2 Example

```javascript
const numbers = [1, 2, 3, 4];

const result = numbers.map((num) => num * 2);

console.log(result); // [2, 4, 6, 8]
console.log(numbers); // [1, 2, 3, 4]
```

## 1.3 Important concepts

- Returns a new array.
- Does not modify the original array.
- Callback receives three arguments: currentValue, index and array.
- Executes for every existing element, including elements whose value is `undefined`.
- Skips empty slots in sparse arrays.
- Returns an array with the same length as the original array.
- A common use case is transforming data.

## 1.4 What is a higher-order function?

A higher-order function is a function that either:

1. Accepts another function as an argument.
2. Returns another function.

`map()` is a higher-order function because it accepts a callback function.

## 1.5 Implementing our own map() – Polyfill

```javascript
Array.prototype.myMap = function (callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  const result = [];

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result.push(callback.call(thisArg, this[i], i, this));
    }
  }

  return result;
};
```

### Explanation

- `Array.prototype`: Makes our method available to arrays.
- `callback`: Function passed by the user.
- `thisArg`: Optional value used as `this` inside the callback.
- `result`: Stores transformed values.
- `this`: Refers to the array calling `myMap()`.
- `i in this`: Checks whether an element exists at that index, preserving sparse-array behaviour.
- `callback.call()`: Executes the callback with the specified `thisArg`.
- `push()`: Adds the transformed value to the result.
- `return result`: Returns the new array.

## 1.6 Common interview questions

**Q1. Does map() modify the original array?**

No. It creates and returns a new array. However, if the callback mutates objects contained in the original array, those mutations can still affect the original objects.

**Q2. What does map() return?**

A new array containing the values returned by the callback.

**Q3. Can map() return undefined?**

Yes. If the callback does not explicitly return anything, the resulting array will contain `undefined` for those elements.

**Q4. Can we use map() without returning anything?**

Yes, but it is generally not recommended when the purpose is transformation.

**Q5. What is the difference between map() and forEach()?**

- `map()` returns a new array.
- `forEach()` returns `undefined`.
- `map()` is mainly used for transformation.
- `forEach()` is mainly used for side effects.

**Q6. What is thisArg in map()?**

It specifies the value of `this` inside the callback function.

**Q7. Does map() execute on empty array slots?**

No. It skips empty slots in sparse arrays.

## 1.7 Cross-questions

**Q8. What will be the output?**

```javascript
const numbers = [1, 2, 3];

const result = numbers.map((num) => {
  num * 2;
});

console.log(result);
```

Answer:

```javascript
[undefined, undefined, undefined];
```

Reason: The arrow function uses braces but does not explicitly return a value.

**Q9. What will be the output?**

```javascript
const numbers = [10, 20, 30];

const result = numbers.map((num, index) => num + index);

console.log(result);
```

Answer:

```javascript
[10, 21, 32];
```

**Q10. Can we chain map() with filter()?**

Yes.

```javascript
const numbers = [1, 2, 3, 4, 5];

const result = numbers.map((num) => num * 2).filter((num) => num > 5);

console.log(result); // [6, 8, 10]
```

---

# 2. Array.prototype.filter()

## 2.1 What is filter()?

**Interview answer:**

`filter()` is a higher-order array method that creates a new array containing only those elements that satisfy a condition specified by the callback function.

It does not modify the original array.

**Syntax:**

```javascript
array.filter(callback(currentValue, index, array), thisArg);
```

## 2.2 Example

```javascript
const numbers = [10, 15, 20, 25, 30];

const result = numbers.filter((num) => num > 20);

console.log(result); // [25, 30]
console.log(numbers); // [10, 15, 20, 25, 30]
```

## 2.3 Important concepts

- Returns a new array.
- Does not modify the original array.
- Callback receives currentValue, index and array.
- Includes an element when the callback returns a truthy value.
- Excludes an element when the callback returns a falsy value.
- Skips empty slots in sparse arrays.
- The resulting array can be shorter than the original array.
- A common use case is searching, filtering and removing unwanted records.

## 2.4 Implementing our own filter() – Polyfill

```javascript
Array.prototype.myFilter = function (callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  const result = [];

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      if (callback.call(thisArg, this[i], i, this)) {
        result.push(this[i]);
      }
    }
  }

  return result;
};
```

### Explanation

- Create an empty result array.
- Loop through the original array.
- Check whether the current index exists.
- Execute the callback with the current value, index and original array.
- If the callback returns a truthy value, push the original element into the result.
- Return the filtered array.

**Important:** Unlike map(), filter() pushes the original element, not the callback's return value.

## 2.5 Common interview questions

**Q1. What does filter() return?**

A new array containing elements that satisfy the callback condition.

**Q2. Does filter() modify the original array?**

No, it returns a new array.

**Q3. What happens if the callback returns false?**

That element is excluded from the resulting array.

**Q4. Can filter() return an empty array?**

Yes. If no elements satisfy the condition, it returns an empty array.

**Q5. Can we use filter() to remove duplicates?**

Yes, although Set is often a simpler solution for primitive values.

```javascript
const numbers = [1, 2, 2, 3, 3, 4];

const unique = numbers.filter((num, index, arr) => arr.indexOf(num) === index);

console.log(unique); // [1, 2, 3, 4]
```

**Q6. What is the difference between map() and filter()?**

- map() transforms every existing element.
- filter() selects elements based on a condition.
- map() generally preserves the original array's length.
- filter() can return fewer elements.

## 2.6 Cross-questions

**Q7. What will be the output?**

```javascript
const numbers = [1, 2, 3, 4, 5];

const result = numbers.filter((num) => num % 2 === 0);

console.log(result);
```

Answer:

```javascript
[2, 4];
```

**Q8. What will be the output?**

```javascript
const numbers = [1, 2, 3];

const result = numbers.filter((num) => num * 2);

console.log(result);
```

Answer:

```javascript
[1, 2, 3];
```

Reason: All callback results are truthy. The callback's numeric result is not used as the filtered value.

**Q9. Can we chain filter() and map()?**

Yes.

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

const result = numbers.filter((num) => num % 2 === 0).map((num) => num * num);

console.log(result); // [4, 16, 36]
```

---

# 3. Array.prototype.reduce()

## 3.1 What is reduce()?

**Interview answer:**

`reduce()` is a higher-order array method that executes a reducer callback on each existing array element and accumulates the result into a single value.

The accumulated value can be a number, string, object, array or another data type.

**Syntax:**

```javascript
array.reduce(callback(accumulator, currentValue, index, array), initialValue);
```

## 3.2 Example – Sum of numbers

```javascript
const numbers = [10, 20, 30, 40];

const total = numbers.reduce((acc, curr) => {
  return acc + curr;
}, 0);

console.log(total); // 100
```

### How does reduce() work?

| Iteration | Accumulator | Current value | Result |
| --------- | ----------: | ------------: | -----: |
| 1         |           0 |            10 |     10 |
| 2         |          10 |            20 |     30 |
| 3         |          30 |            30 |     60 |
| 4         |          60 |            40 |    100 |

Final result: `100`.

## 3.3 Important concepts

- Returns one accumulated result.
- Does not modify the original array by itself.
- The accumulator stores the accumulated result.
- The currentValue represents the current element.
- An initialValue is optional.
- Without initialValue, the first existing element becomes the initial accumulator.
- Empty arrays without an initialValue throw a TypeError.
- A common use case is summation, grouping, counting and transforming arrays into objects.

## 3.4 What is the difference between accumulator and currentValue?

- Accumulator: Stores the result accumulated so far.
- CurrentValue: Represents the current element being processed.

## 3.5 Implementing our own reduce() – Polyfill

```javascript
Array.prototype.myReduce = function (callback, initialValue) {
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }

  const arr = this;
  let accumulator;
  let startIndex = 0;

  if (arguments.length >= 2) {
    accumulator = initialValue;
  } else {
    while (startIndex < arr.length && !(startIndex in arr)) {
      startIndex++;
    }

    if (startIndex >= arr.length) {
      throw new TypeError("Reduce of empty array with no initial value");
    }

    accumulator = arr[startIndex];
    startIndex++;
  }

  for (let i = startIndex; i < arr.length; i++) {
    if (i in arr) {
      accumulator = callback(accumulator, arr[i], i, arr);
    }
  }

  return accumulator;
};
```

### Explanation

- Validate that the callback is a function.
- Store the original array in `arr`.
- Declare the accumulator.
- Check whether an initial value was supplied.
- If supplied, use it as the initial accumulator.
- Otherwise, find the first existing array element.
- If no element exists, throw a TypeError.
- Iterate over the remaining existing elements.
- Pass accumulator, current value, index and original array to the callback.
- Update the accumulator with every callback result.
- Return the final accumulated value.

## 3.6 Why is initialValue important?

It determines the starting value of the accumulator.

Example:

```javascript
const numbers = [10, 20, 30];

const result = numbers.reduce((acc, curr) => {
  return acc + curr;
}, 100);

console.log(result); // 160
```

Without an initial value, the first element becomes the accumulator and iteration begins with the second existing element.

## 3.7 Common interview questions

**Q1. What does reduce() return?**

It returns the final accumulated value, which can be of any type.

**Q2. Is initialValue mandatory?**

No, it is optional, but providing it is usually safer and clearer.

**Q3. What happens when we use reduce() on an empty array without an initial value?**

It throws a TypeError.

**Q4. Can reduce() return an object?**

Yes.

```javascript
const users = [
  { name: "A", age: 25 },
  { name: "B", age: 30 },
];

const result = users.reduce((acc, user) => {
  acc[user.name] = user.age;
  return acc;
}, {});

console.log(result);

// { A: 25, B: 30 }
```

**Q5. Can reduce() be used instead of map() and filter()?**

Yes. Reduce() is flexible enough to perform many transformations and filtering operations, but map() and filter() are often more readable when those are the actual intentions.

**Q6. Does reduce() mutate the original array?**

Not automatically. However, a reducer callback can mutate objects or arrays if we write it that way.

## 3.8 Cross-questions

**Q7. What is the output?**

```javascript
const numbers = [1, 2, 3, 4];

const result = numbers.reduce((acc, curr) => {
  return acc + curr;
});

console.log(result);
```

Answer:

```javascript
10;
```

**Q8. What is the output?**

```javascript
const numbers = [1, 2, 3];

const result = numbers.reduce((acc, curr) => {
  return acc + curr;
}, 10);

console.log(result);
```

Answer:

```javascript
16;
```

**Q9. What is the output?**

```javascript
const numbers = [1, 2, 3];

const result = numbers.reduce((acc, curr) => {
  acc.push(curr * 2);
  return acc;
}, []);

console.log(result);
```

Answer:

```javascript
[2, 4, 6];
```

**Q10. What happens if you forget to return the accumulator?**

The accumulator may become `undefined` after the first callback execution, causing unexpected results in subsequent iterations.

---

# 4. Function.prototype.call()

## 4.1 What is call()?

**Interview answer:**

`call()` is a built-in JavaScript method that allows us to invoke a function immediately while explicitly specifying the value of `this` and passing arguments individually.

It is commonly used for function borrowing.

**Syntax:**

```javascript
functionName.call(thisArg, arg1, arg2, ...);
```

## 4.2 Example

```javascript
const user = {
  name: "Ritika",
};

function greet(greeting) {
  return `${greeting}, ${this.name}!`;
}

console.log(greet.call(user, "Hello"));

// Hello, Ritika!
```

Here, `this` inside greet() refers to the user object.

## 4.3 What problem does call() solve?

Normally, the value of `this` depends on how a regular function is invoked.

Sometimes we want to control the value of `this` explicitly.

`call()` allows us to borrow a function and execute it with a different object as its context without duplicating the method.

## 4.4 Function borrowing

```javascript
const person1 = {
  name: "Ritika",
};

const person2 = {
  name: "Sachin",
};

function introduce(city) {
  return `${this.name} lives in ${city}`;
}

console.log(introduce.call(person1, "Mumbai"));
console.log(introduce.call(person2, "Pune"));
```

Output:

```javascript
Ritika lives in Mumbai
Sachin lives in Pune
```

The same function is reused with two different objects.

## 4.5 Implementing our own call() – Polyfill

Educational implementation for common use cases:

```javascript
Function.prototype.myCall = function (thisArg, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("myCall must be called on a function");
  }

  if (thisArg === null || thisArg === undefined) {
    thisArg = globalThis;
  } else {
    thisArg = Object(thisArg);
  }

  const fnKey = Symbol("fn");

  thisArg[fnKey] = this;

  let result;

  try {
    result = thisArg[fnKey](...args);
  } finally {
    delete thisArg[fnKey];
  }

  return result;
};
```

### Explanation

- `Function.prototype`: Adds the method to functions.
- `this`: Refers to the function that invokes myCall().
- `thisArg`: Object that should become the function's `this`.
- `...args`: Collects individual arguments into an array.
- `Object(thisArg)`: Boxes primitive values into wrapper objects.
- `Symbol("fn")`: Creates a unique property key.
- `thisArg[fnKey] = this`: Temporarily attaches the original function to the object.
- `thisArg[fnKey](...args)`: Invokes the function as a method, setting its `this` to the object.
- `try...finally`: Ensures cleanup even if the function throws an error.
- `delete`: Removes the temporary property.
- `return result`: Returns the original function's result.

**Important:** This is an educational implementation, not a completely specification-compliant native call() polyfill. In particular, strict-mode null/undefined handling and non-extensible objects require more careful treatment.

## 4.6 Common interview questions

**Q1. What does call() do?**

It immediately invokes a function with an explicitly specified `this` value and individually supplied arguments.

**Q2. Does call() return a new function?**

No. It executes the function immediately and returns the function's result.

**Q3. What happens if we don't pass thisArg?**

For ordinary non-strict functions, `this` generally defaults to the global object. For strict-mode functions, it remains undefined.

**Q4. Can call() change the this value of an arrow function?**

No. Arrow functions have lexical `this`.

**Q5. What is function borrowing?**

Using a function belonging to one object with another object as its `this` context.

**Q6. Why do we use Symbol() in our call polyfill?**

To create a unique temporary property key and avoid accidentally overwriting an existing property.

**Q7. Why do we use try...finally?**

To guarantee that the temporary property is deleted even if the invoked function throws an error.

## 4.7 Cross-questions

**Q8. What is the output?**

```javascript
const user = {
  name: "Ritika",
};

function greet() {
  return this.name;
}

console.log(greet.call(user));
```

Answer:

```javascript
Ritika;
```

**Q9. What is the output?**

```javascript
const user = {
  name: "Ritika",
};

function updateName() {
  this.name = "Sachin";
  return this.name;
}

console.log(updateName.call(user));
console.log(user.name);
```

Answer:

```javascript
Sachin;
Sachin;
```

Reason: The original object is modified.

**Q10. What happens here?**

```javascript
const user = {
  name: "Ritika",
};

function greet() {
  return this.name;
}

console.log(greet.call({ ...user }));
```

Answer:

```javascript
Ritika;
```

The spread operator creates a shallow copy of the object. The function receives the copied object as its context.

---

# 5. Function.prototype.apply()

## 5.1 What is apply()?

**Interview answer:**

`apply()` is a built-in JavaScript method that invokes a function immediately with a specified `this` value and accepts function arguments as an array or array-like object.

**Syntax:**

```javascript
functionName.apply(thisArg, [arg1, arg2, ...]);
```

## 5.2 Example

```javascript
const user = {
  name: "Ritika",
};

function introduce(city, country) {
  return `${this.name} lives in ${city}, ${country}`;
}

console.log(introduce.apply(user, ["Mumbai", "India"]));
```

Output:

```javascript
Ritika lives in Mumbai, India
```

## 5.3 Difference between call() and apply()

Both methods:

- Invoke functions immediately.
- Allow us to explicitly specify `this`.
- Return the function's result.

The difference is how arguments are passed.

```javascript
function add(a, b) {
  return a + b;
}

// call()
add.call(null, 10, 20);

// apply()
add.apply(null, [10, 20]);
```

## 5.4 What is an array-like object?

An array-like object is an object that has indexed properties and a length property, but does not necessarily have array methods.

Example:

```javascript
const values = {
  0: "Mumbai",
  1: "India",
  length: 2,
};
```

This object is array-like, but it is not an actual array.

## 5.5 Implementing our own apply() – Polyfill

Educational implementation:

```javascript
Function.prototype.myApply = function (thisArg, argsArray) {
  if (typeof this !== "function") {
    throw new TypeError("myApply must be called on a function");
  }

  if (thisArg === null || thisArg === undefined) {
    thisArg = globalThis;
  } else {
    thisArg = Object(thisArg);
  }

  let args = [];

  if (argsArray !== null && argsArray !== undefined) {
    if (typeof argsArray !== "object" && typeof argsArray !== "function") {
      throw new TypeError("Arguments must be an array-like object");
    }

    const length = Math.min(
      Math.max(Math.floor(Number(argsArray.length) || 0), 0),
      Number.MAX_SAFE_INTEGER,
    );

    for (let i = 0; i < length; i++) {
      args.push(argsArray[i]);
    }
  }

  const fnKey = Symbol("fn");

  thisArg[fnKey] = this;

  let result;

  try {
    result = thisArg[fnKey](...args);
  } finally {
    delete thisArg[fnKey];
  }

  return result;
};
```

### Explanation

- Validate that the calling value is a function.
- Handle null and undefined.
- Convert primitive values into wrapper objects.
- Create an empty arguments array.
- Check whether an arguments collection was provided.
- Read its length.
- Copy the indexed arguments into a normal array.
- Create a unique Symbol key.
- Attach the original function temporarily.
- Invoke the function using spread syntax.
- Remove the temporary property using finally.
- Return the result.

**Important:** Like our myCall() implementation, this is a practical educational version, not an exact native specification implementation.

## 5.6 Common interview questions

**Q1. What is the difference between call() and apply()?**

call() accepts arguments individually, whereas apply() accepts arguments as an array or array-like collection.

**Q2. Does apply() execute immediately?**

Yes.

**Q3. Does apply() return a new function?**

No. It returns the result of the function invocation.

**Q4. Can apply() accept an array-like object?**

Yes.

**Q5. What happens if we pass null as the second argument?**

The function is invoked without additional arguments.

**Q6. Can apply() be used with arrow functions to change this?**

No. Arrow functions retain their lexical `this`.

## 5.7 Cross-questions

**Q7. What is the output?**

```javascript
function calculate(a, b, c) {
  return this.value + a + b + c;
}

const obj = { value: 10 };

console.log(calculate.apply(obj, [10, 20, 30]));
```

Answer:

```javascript
70;
```

**Q8. What is the output?**

```javascript
function greet(city, country) {
  return `${this.name} - ${city} - ${country}`;
}

const user = { name: "Ritika" };

console.log(
  greet.apply(user, {
    0: "Mumbai",
    1: "India",
    length: 2,
  }),
);
```

Answer:

```javascript
Ritika - Mumbai - India;
```

**Q9. What is the difference between an array and an array-like object?**

An array has built-in array methods and array-specific behaviour. An array-like object only needs indexed properties and a length property.

---

# 6. Function.prototype.bind()

## 6.1 What is bind()?

**Interview answer:**

`bind()` is a built-in JavaScript method that creates and returns a new function with a permanently bound `this` value and optionally pre-filled arguments.

Unlike call() and apply(), bind() does not execute the original function immediately.

## 6.2 Example

```javascript
const user = {
  name: "Ritika",
};

function greet() {
  return `Hello, ${this.name}`;
}

const boundGreet = greet.bind(user);

console.log(boundGreet());
```

Output:

```javascript
(Hello, Ritika);
```

## 6.3 Difference between call(), apply() and bind()

| Feature       | call()          | apply()         | bind()       |
| ------------- | --------------- | --------------- | ------------ |
| Execution     | Immediate       | Immediate       | Later        |
| Arguments     | Individually    | Array-like      | Individually |
| Return value  | Function result | Function result | New function |
| Controls this | Yes             | Yes             | Yes          |

## 6.4 What is partial application?

Partial application means fixing some arguments of a function in advance and passing the remaining arguments later.

Example:

```javascript
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);

console.log(double(5)); // 10
console.log(double(10)); // 20
```

Here, the first argument is permanently set to 2.

## 6.5 Implementing our own bind() – Polyfill

Educational implementation:

```javascript
Function.prototype.myBind = function (thisArg, ...boundArgs) {
  if (typeof this !== "function") {
    throw new TypeError("myBind must be called on a function");
  }

  const targetFn = this;

  function boundFunction(...laterArgs) {
    const allArgs = [...boundArgs, ...laterArgs];

    if (new.target) {
      return Reflect.construct(
        targetFn,
        allArgs,
        new.target === boundFunction ? targetFn : new.target,
      );
    }

    return Reflect.apply(targetFn, thisArg, allArgs);
  }

  if (targetFn.prototype) {
    boundFunction.prototype = targetFn.prototype;
  }

  return boundFunction;
};
```

### Explanation

- `this`: Original function on which myBind() is called.
- `thisArg`: The value we want to bind as `this`.
- `boundArgs`: Arguments provided during the original bind call.
- `targetFn`: Stores the original function.
- `boundFunction`: New function returned by myBind().
- `laterArgs`: Arguments passed when the new function is eventually invoked.
- `allArgs`: Combines preset and later arguments.
- `new.target`: Detects whether the bound function was invoked using `new`.
- `Reflect.construct()`: Handles constructor invocation.
- `Reflect.apply()`: Invokes the target function with a specified `this` and argument list.
- `return boundFunction`: Returns the newly created function.

**Important:** This implementation handles common use cases but does not reproduce every detail of native bind(), including all constructor, prototype and function-property semantics.

## 6.6 Common interview questions

**Q1. Does bind() execute the original function immediately?**

No. It returns a new function that can be executed later.

**Q2. Can we change the this value of a bound function using call() or apply()?**

No. The original binding takes precedence during ordinary function invocation.

**Q3. What happens when we bind a function more than once?**

The first bound `this` value remains effective. Additional arguments can still be added through subsequent binding.

**Q4. Can bind() be used for partial application?**

Yes. We can preset some arguments and provide the remaining arguments later.

**Q5. What happens when we use new with a bound function?**

The bound `thisArg` is ignored. A new object is created using the target function's constructor behaviour. Preset arguments are still applied.

**Q6. Can bind() change the this value of an arrow function?**

No. Arrow functions use lexical `this`.

**Q7. What is the difference between binding and borrowing?**

Binding creates a new function with a fixed `this` value. Borrowing generally means invoking an existing function using another object as its context, often through call() or apply().

## 6.7 Cross-questions

**Q8. What is the output?**

```javascript
const user1 = { name: "Ritika" };
const user2 = { name: "Sachin" };

function greet() {
  return this.name;
}

const bound = greet.bind(user1);

console.log(bound.call(user2));
```

Answer:

```javascript
Ritika;
```

The bound `this` cannot be replaced by call().

**Q9. What is the output?**

```javascript
function introduce(role, company) {
  return `${this.name} - ${role} - ${company}`;
}

const user = { name: "Ritika" };

const bound = introduce.bind(user, "Developer");

console.log(bound("Tata Trent"));
```

Answer:

```javascript
Ritika - Developer - Tata Trent
```

**Q10. What happens when we bind twice?**

```javascript
const person1 = { name: "Ritika" };
const person2 = { name: "Sachin" };

function greet() {
  return this.name;
}

const first = greet.bind(person1);
const second = first.bind(person2);

console.log(second());
```

Answer:

```javascript
Ritika;
```

The first binding takes precedence.

**Q11. What is the output?**

```javascript
function Employee(name) {
  this.name = name;
}

const BoundEmployee = Employee.bind({ name: "Sachin" }, "Ritika");

const employee = new BoundEmployee();

console.log(employee.name);
```

Answer:

```javascript
Ritika;
```

The new keyword creates a new instance and ignores the bound thisArg. The preset argument `"Ritika"` is still passed to the constructor.

---

# 7. Important JavaScript concepts connecting all six topics

## 7.1 What is this in JavaScript?

`this` refers to the execution context of a regular function. Its value generally depends on how the function is called.

For example:

```javascript
const user = {
  name: "Ritika",
  greet() {
    console.log(this.name);
  },
};

user.greet(); // Ritika
```

Here, `this` refers to the object before the dot: user.

## 7.2 Regular function vs arrow function

Regular function:

```javascript
function greet() {
  console.log(this);
}
```

Arrow function:

```javascript
const greet = () => {
  console.log(this);
};
```

A regular function gets its `this` from its invocation context. An arrow function captures `this` lexically from its surrounding scope.

## 7.3 What are rest parameters?

Rest parameters collect multiple arguments into a single array.

```javascript
function add(...numbers) {
  console.log(numbers);
}

add(10, 20, 30);

// [10, 20, 30]
```

## 7.4 What is spread syntax?

Spread syntax expands an iterable into individual elements.

```javascript
const numbers = [10, 20, 30];

console.log(Math.max(...numbers)); // 30
```

## 7.5 What is the difference between rest and spread?

- Rest collects values into an array.
- Spread expands values from an iterable.

## 7.6 What is arguments?

`arguments` is an array-like object available inside traditional functions. It contains the arguments passed to the function.

```javascript
function example() {
  console.log(arguments);
}

example(10, 20, 30);
```

Unlike a real array, `arguments` does not directly provide all array methods.

Arrow functions do not have their own arguments object.

---

# 8. Comparison table – Quick revision

| Feature                  | map()          | filter()       | reduce()       |
| ------------------------ | -------------- | -------------- | -------------- |
| Purpose                  | Transform      | Select         | Accumulate     |
| Returns                  | New array      | New array      | Any value      |
| Callback                 | Yes            | Yes            | Yes            |
| Original array modified? | No, by default | No, by default | No, by default |
| Initial value            | Not applicable | Not applicable | Optional       |

| Feature               | call()           | apply()          | bind()                |
| --------------------- | ---------------- | ---------------- | --------------------- |
| Purpose               | Invoke with this | Invoke with this | Create bound function |
| Executes immediately? | Yes              | Yes              | No                    |
| Argument format       | Individual       | Array-like       | Individual            |
| Returns               | Result           | Result           | Function              |

---

# 9. Common coding interview exercises

Practise implementing these without looking at the solutions.

### Array methods

1. Double every number using map().
2. Extract only even numbers using filter().
3. Calculate the sum of an array using reduce().
4. Find the maximum number using reduce().
5. Convert an array of user objects into an array of full names using map().
6. Filter users whose age is greater than 25.
7. Count the frequency of elements using reduce().
8. Group users by their age using reduce().
9. Remove duplicates using filter().
10. Calculate the total price of products using reduce().

### Function methods

11. Implement myCall().
12. Implement myApply().
13. Implement myBind().
14. Implement function borrowing using call().
15. Use bind() to create a partially applied function.
16. Predict the output of a function with multiple call() and bind() invocations.
17. Explain how bind() works with constructors.
18. Explain why arrow functions cannot have their this value overridden.

---

# 10. Interviewer cross-question checklist

Before an interview, make sure you can answer these without looking at your notes.

### map(), filter(), reduce()

- [ ] What is a higher-order function?
- [ ] What is a callback function?
- [ ] What is the difference between map() and forEach()?
- [ ] What is the difference between map() and filter()?
- [ ] What is the difference between filter() and reduce()?
- [ ] What happens when a callback does not return anything?
- [ ] What is the accumulator in reduce()?
- [ ] What happens when initialValue is omitted?
- [ ] Can reduce() return an object?
- [ ] Can these methods be chained?
- [ ] What is thisArg?
- [ ] How do sparse arrays behave with these methods?

### call(), apply(), bind()

- [ ] What problem do call(), apply() and bind() solve?
- [ ] What is function borrowing?
- [ ] What is the difference between call() and apply()?
- [ ] Why does bind() return a new function?
- [ ] What is partial application?
- [ ] What happens when we bind twice?
- [ ] Can call() override an existing binding?
- [ ] What happens when new is used with a bound function?
- [ ] Why can't we override arrow-function this?
- [ ] Why do we use Symbol() in our polyfills?
- [ ] Why do we use try...finally?
- [ ] What is the purpose of Reflect.apply() and Reflect.construct()?

---

# 11. Final interview-ready summary

**map():** Used to transform every existing element and return a new array.

**filter():** Used to select elements based on a condition and return a new array.

**reduce():** Used to accumulate array elements into a single result.

**call():** Invokes a function immediately with a specified this value and individually passed arguments.

**apply():** Invokes a function immediately with a specified this value and arguments supplied as an array or array-like object.

**bind():** Returns a new function with a bound this value and optionally preset arguments. It does not execute the original function immediately.

---

# 12. My final preparation strategy

Before attending a JavaScript interview, I should be able to:

1. Explain all six methods in simple language.
2. Write their syntax without looking at notes.
3. Explain their differences with practical examples.
4. Implement map(), filter() and reduce() polyfills.
5. Implement call(), apply() and bind() polyfills.
6. Predict output for tricky code snippets.
7. Explain this, callbacks, rest parameters and spread syntax.
8. Explain edge cases such as missing returns, initialValue, sparse arrays, repeated binding and constructor invocation.
9. Solve at least two practical coding questions for each topic.
10. Explain my approach confidently without memorising answers word for word.

**Interview rule:** Understand the logic, explain your approach, write the code, and then discuss edge cases. Don't simply memorise the implementation.
