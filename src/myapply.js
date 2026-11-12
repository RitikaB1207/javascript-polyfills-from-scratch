Function.prototype.myApply = function (thisArg, argsArray) {

    // Step 1: Check whether the caller is a function
    if (typeof this !== "function") {
        throw new TypeError("myApply must be called on a function");
    }

    // Step 2: Handle null and undefined
    if (thisArg === null || thisArg === undefined) {
        thisArg = globalThis;
    } else {
        // Step 3: Convert primitive values into objects
        thisArg = Object(thisArg);
    }

    // Step 4: Handle the arguments array
    let args = [];

    if (argsArray !== null && argsArray !== undefined) {

        if (typeof argsArray !== "object" &&
            typeof argsArray !== "function") {
            throw new TypeError("Arguments must be an array-like object");
        }

        const length = Math.min(
            Math.max(Math.floor(Number(argsArray.length) || 0), 0),
            Number.MAX_SAFE_INTEGER
        );

        for (let i = 0; i < length; i++) {
            args.push(argsArray[i]);
        }
    }

    // Step 5: Create a unique temporary property
    const fnKey = Symbol("fn");

    // Step 6: Attach the function to the object
    thisArg[fnKey] = this;

    let result;

    try {
        // Step 7: Execute the function
        result = thisArg[fnKey](...args);
    } finally {
        // Step 8: Clean up
        delete thisArg[fnKey];
    }

    // Step 9: Return the result
    return result;
};