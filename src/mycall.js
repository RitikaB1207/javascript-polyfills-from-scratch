Function.prototype.myCall = function (thisArg, ...args) {

    // Step 1: Check whether the caller is a function
    if (typeof this !== "function") {
        throw new TypeError("myCall must be called on a function");
    }

    // Step 2: Handle null and undefined
    if (thisArg === null || thisArg === undefined) {
        thisArg = globalThis;
    } else {
        // Step 3: Convert primitive values into objects
        thisArg = Object(thisArg);
    }

    // Step 4: Create a unique temporary property
    const fnKey = Symbol("fn");

    // Step 5: Attach the current function to the object
    thisArg[fnKey] = this;

    // Step 6: Execute the function with arguments
    let result;

    try {
        result = thisArg[fnKey](...args);
    } finally {
        // Step 7: Remove the temporary property
        delete thisArg[fnKey];
    }

    // Step 8: Return the function's result
    return result;
};