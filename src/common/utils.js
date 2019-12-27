var Utils = {};

// Returns true if value is an integral value, even if value is a string
Utils.isInt = function (value) {
    return !isNaN(value) &&
         parseInt(Number(value)) == value && // Must use == instead of === here
         !isNaN(parseInt(value, 10));
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Assumes both max and min are integers.
 * Using Math.round() will give you a non-uniform distribution!
 */
Utils.randInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = Utils;
