'use strict';

var Utils = require('../common/utils');
var _ = require('underscore');

function Scorer () {
    this._scored = new Set();
}

// Upper section scoring
Scorer.ONES_CODE = 'ones';
Scorer.TWOS_CODE = 'twos';
Scorer.THREES_CODE = 'threes';
Scorer.FOURS_CODE = 'fours';
Scorer.FIVES_CODE = 'fives';
Scorer.SIXES_CODE = 'sixes';

// Bonus
Scorer.BONUS_CODE = 'bonus';

// Lower section scoring
Scorer.LGSTRAIGHT_CODE = 'large-straight';
Scorer.SMSTRAIGHT_CODE = 'small-straight';
Scorer.FULLHOUSE_CODE = 'full-house';
Scorer.THREEKIND_CODE = 'three-of-a-kind';
Scorer.FOURKIND_CODE = 'four-of-a-kind';
Scorer.FRSTYAHTZEE_CODE = 'first-yahtzee';

// Other score codes
Scorer.SCNDYAHTZEE_CODE = 'second-yahtzee';
Scorer.CHANCE_CODE = 'chance';

Scorer.YAHTZEE_SCORE_NUM = '13';

Scorer.NUM_SAME_FOR_YAHTZEE = 5;
Scorer.NUM_CATEGORIES = 13;
Scorer.LGSTRAIGHT_SCORE = 40;
Scorer.SMSTRAIGHT_SCORE = 30;
Scorer.FULLHOUSE_SCORE = 25;
Scorer.MIN_SCORE_FOR_BONUS = 63;
Scorer.BONUS_SCORE = 35;
Scorer.FRSTYAHTZEE_SCORE = 50;
Scorer.SCNDYAHTZEE_SCORE = 100;
Scorer._SMSTRAIGHT_CONSECUTIVE = 4;
Scorer._LGSTRAIGHT_CONSECUTIVE = 5;

Scorer.upperScoreCodes = new Set([
    Scorer.ONES_CODE, Scorer.TWOS_CODE, Scorer.THREES_CODE,
    Scorer.FOURS_CODE, Scorer.FIVES_CODE, Scorer.SIXES_CODE
]);

// Returns true if a given category has been scored in; false otherwise
Scorer.prototype.scored = function (scoreCode) {
    return this._scored.has(scoreCode);
};

Scorer.prototype.setScored = function (scoreCode) {
    this._scored.add(scoreCode);
};

// Returns the score scored for a particular die roll, when scored in the given category.
// Internal _scored set is updated to indicate the category has been scored in.
Scorer.prototype.score = function (dieRoll, scoreCode) {
    if (this._scored.has(scoreCode)) {
        return 0;
    }

    var score;

    console.log('Is the score code an upper score code?', isUpperScoreCode(scoreCode));

    if (isUpperScoreCode(scoreCode)) {
        score = scoreForUpperSection(dieRoll, scoreCode);
    } else if (scoreCode === Scorer.LGSTRAIGHT_CODE) {
        score = scoreAsLargeStraight(dieRoll);
    } else if (scoreCode === Scorer.SMSTRAIGHT_CODE) {
        score = scoreAsSmallStraight(dieRoll);
    } else if (scoreCode === Scorer.FULLHOUSE_CODE) {
        score = scoreAsFullHouse(dieRoll);
    } else if (scoreCode === Scorer.THREEKIND_CODE) {
        score = scoreAsThreeKind(dieRoll);
    } else if (scoreCode === Scorer.FOURKIND_CODE) {
        score = scoreAsFourKind(dieRoll);
    } else if (scoreCode === Scorer.CHANCE_CODE) {
        score = sumOfRoll(dieRoll);
    } else if (scoreCode === Scorer.FRSTYAHTZEE_CODE) {
        score = scoreAsFirstYahtzee(dieRoll);
    } else if (scoreCode === Scorer.SCNDYAHTZEE_CODE) {
        score = scoreAsSecondYahtzee(dieRoll);
    } else {
        throw new Error('Invalid score code: \'' + scoreCode + '\'');
    }

    this._scored.add(scoreCode);
    return score;
};

function scoreAsLargeStraight (dieRoll) {
    return hasNConsecutiveValues(dieRoll, Scorer._LGSTRAIGHT_CONSECUTIVE) ? Scorer.LGSTRAIGHT_SCORE : 0;
}

function scoreAsSmallStraight (dieRoll) {
    return hasNConsecutiveValues(dieRoll, Scorer._SMSTRAIGHT_CONSECUTIVE) ? Scorer.SMSTRAIGHT_SCORE : 0;
}

function scoreAsFullHouse (dieRoll) {
    return isFullHouse(dieRoll) ? Scorer.FULLHOUSE_SCORE : 0;
}

function sumOfRoll (dieRoll) {
    var sum = 0;
    for (var i = 0; i < dieRoll.length; ++i) {
        sum += dieRoll[i];
    }
    return sum;
}

// Returns true if the roll contains at least n values that are the same; otherwise false
function atLeastNTheSame (dieRoll, n) {
    return max(_.values(getCountPerValue(dieRoll))) >= n;
}

function max (array) {
    var max = array[0];
    for (var i = 1; i < array.length; ++i) {
        if (array[i] > max) {
            max = array[i];
        }
    }
    return max;
}

function scoreAsThreeKind (dieRoll) {
    return hasThreeOrMoreSame(dieRoll) ? sumOfRoll(dieRoll) : 0;
}

function scoreAsFourKind (dieRoll) {
    return hasFourOrMoreSame(dieRoll) ? sumOfRoll(dieRoll) : 0;
}

function scoreAsFirstYahtzee (dieRoll) {
    return isYahtzee(dieRoll) ? Scorer.FRSTYAHTZEE_SCORE : 0;
}

function scoreAsSecondYahtzee (dieRoll) {
    return isYahtzee(dieRoll) ? Scorer.SCNDYAHTZEE_SCORE : 0;
}

function isUpperScoreCode (scoreCode) {
    return Scorer.upperScoreCodes.has(scoreCode);
}

// Returns true if category is a valid category (is a number in [1,13]), and false otherwise
Scorer.isValidCategory = function (categoryStr) {
    var category = parseInt(categoryStr, 10);

    // parseInt returns a Number rather than an int. parseInt also floors its
    // input in order to return an integral, so we must confirm the original
    // string is integral.
    return Utils.isInt(categoryStr) && category >= 1 && category <= Scorer.NUM_CATEGORIES;
}

// Returns a map representing corresponding the die values rolled to the number of
// dice with the same value. The keys are the die values rolled, and the values are
// the number of dice rolled with that value. For convenience, there is a key for every
// possible die value.
//
// For example, a roll of {5, 4, 5, 3, 1} would return a map of
// {1: 1, 2: 0, 3: 1, 4: 1, 5: 2, 6: 0}
function getCountPerValue (dieRoll) {
    var ret = {};
    var minDieRoll = 1, maxDieRoll = 6, i;

    // Set every key's corresponding value to 0
    for (i = minDieRoll; i <= maxDieRoll; ++i) {
        ret[i] = 0;
    }

    for (i = 0; i < dieRoll.length; ++i) {
        var value = dieRoll[i];
        ret[value] = ret[value] + 1;
    }

    return ret;
}

// Returns true if the die roll is a possible yahtzee
function isYahtzee (dieRoll) {
    return _.values(getCountPerValue(dieRoll)).includes(Scorer.NUM_SAME_FOR_YAHTZEE);
}

// Returns true if the die roll is a four of a kind
function hasFourOrMoreSame (dieRoll) {
    return atLeastNTheSame(dieRoll, 4);
}

// Returns true if the die roll is a three of a kind
function hasThreeOrMoreSame (dieRoll) {
    return atLeastNTheSame(dieRoll, 3);
}

// Returns true if the die roll is a full house
function isFullHouse (dieRoll) {
    var counts = _.values(getCountPerValue(dieRoll));

    // A full house requires two of a kind and three of a kind
    return counts.includes(2) && counts.includes(3);
}

function scoreForUpperSection (dieRoll, scoreCode) {
    var codeToDieRoll = {};
    codeToDieRoll[Scorer.ONES_CODE] = 1;
    codeToDieRoll[Scorer.TWOS_CODE] = 2;
    codeToDieRoll[Scorer.THREES_CODE] = 3;
    codeToDieRoll[Scorer.FOURS_CODE] = 4;
    codeToDieRoll[Scorer.FIVES_CODE] = 5;
    codeToDieRoll[Scorer.SIXES_CODE] = 6;

    console.log('scoreCode is', scoreCode);

    var score = 0;
    for (var i = 0; i < dieRoll.length; ++i) {
        if (dieRoll[i] === codeToDieRoll[scoreCode]) {
            score += dieRoll[i];
        }
    }

    return score;
}

// Returns true if dieRoll contains a permutation with n or more consecutive numbers.
//
// The logic is a sorted list of integers would cause larger integers to come after
// smaller integers. If integers at position i and i+1 in the list have a difference
// of 1, then those two items are consecutive. Thus, if a counter reaches n,
// there are n consecutive values in a permutation of the list.
function hasNConsecutiveValues (dieRoll, n) {
    var dieRollCopy = arrayCopy(dieRoll);
    dieRollCopy.sort(function (a, b) { return a - b; });
    var counter = 1; // counter starts at (and is reset to) 1, since any value is a consecutive list of size 1
    var lastValue = dieRollCopy[0];

    // i must start at 1 (if i started at 0, then 0-1 = -1)
    for (var i = 1; i < dieRollCopy.length; ++i) {
        if (dieRollCopy[i] === lastValue) {
            // Do nothing
        } else if (dieRollCopy[i] - dieRollCopy[i-1] === 1) {
            ++counter;
            if (counter === n) {
                return true;
            }
        } else {
            counter = 1;
        }
        lastValue = dieRollCopy[i];
    }

    // Counter never reached n, so there is not n consecutive values
    return false;
}

function arrayCopy (array) {
    var ret = []
    for (var i = 0; i < array.length; ++i) {
        ret[i] = array[i];
    }
    return ret;
}

module.exports = Scorer;
