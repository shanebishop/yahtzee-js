var Utils = {};

// Returns true if value is an integral value, even if value is a string
Utils.isInt = function (value) {
    return !isNaN(value) &&
         parseInt(Number(value)) == value && // Must use == instead of === here
         !isNaN(parseInt(value, 10));
}

module.exports = Utils;
