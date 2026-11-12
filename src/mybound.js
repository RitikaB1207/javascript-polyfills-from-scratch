Function.prototype.myBind = function (thisArg, ...boundArgs) {

    // Step 1: Validate the calling function
    if (typeof this !== "function") {
        throw new TypeError("myBind must be called on a function");
    }

    // Step 2: Store the original function
    const targetFn = this;

    // Step 3: Create and return a new function
    function boundFunction(...laterArgs) {

        // Step 4: Combine both sets of arguments
        const allArgs = [...boundArgs, ...laterArgs];

        // Step 5: Handle constructor invocation
        if (new.target) {
            return Reflect.construct(
                targetFn,
                allArgs,
                new.target === boundFunction ? targetFn : new.target
            );
        }

        // Step 6: Execute with the bound this context
        return Reflect.apply(targetFn, thisArg, allArgs);
    }

    // Step 7: Support instanceof for constructible functions
    if (targetFn.prototype) {
        boundFunction.prototype = targetFn.prototype;
    }

    // Step 8: Return the new function
    return boundFunction;
};