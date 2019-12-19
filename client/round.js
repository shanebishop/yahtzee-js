'use strict';

var Game = require('./game')

function Round (view) {
    this._view = view;
    this._rollsRemaining = Round.MAX_ROLLS;
    this._rolled = [];
    for (var i = 0; i < Game.NUM_DICE_ROLLED; ++i) {
        this._rolled[i] = undefined;
    }
}

// User commands
Round.HOLD_CMD = 1;
Round.REROLL_CMD = 2;
Round.SCORE_CMD = 3;

Round.MAX_ROLLS = 3;

Round.prototype.getRolled = function () {
    return this._rolled;
};

Round.prototype.canReroll = function () {
    return this._rollsRemaining > 0;
};

Round.isValidCommand = function (command) {
    return [Round.HOLD_CMD, Round.REROLL_CMD, Round.SCORE_CMD].includes(command);
};

Round.prototype.playRound = function () {
    this._view
            .showScores()
            .promptForRoll();
    roll();

    round:
    while (this.canReroll()) {
        this._view.displayRoll(getRolled());
        var command = view.promptPostrollAction();

        switch (command) {
            case Round.HOLD_CMD:
                var posToHold = view.promptForPosToHold();
                roll(posToHold);
                break;
            case Round.REROLL_CMD:
                roll();
                break;
            case Round.SCORE_CMD:
                break round; // If scoring, stop looping
            default:
                throw new Error('Invalid Round command: ' + command);
                break;
        }
    }

    if (!this.canReroll()) {
        this._view.displayRoll(getRolled());
    }

    var isYahtzee = Scorer.isYahtzee(getRolled());
    return this._view.promptForCategory(getRolled(), isYahtzee);
};

// Reroll dice not at positions in heldPos, and return result
// Positions in heldPos are 1-based indices, and are translated internally to 0-based indices
Round.prototype.roll = function (heldPos) {
    var firstRoll = this._rollsRemaining === Round.MAX_ROLLS;
    heldPos = heldPos || [];

    if (!this.canReroll()) {
        return this._rolled; // Do not reroll
    } else if (firstRoll) {
        heldPos = []; // Cannot be holding any positions if this is the first roll
    }

    var maxDieRoll = 6;

    for (var i = 0; i < this._rolled.length; ++i) {
        // If this position is not held, reroll it
        if (!heldPos.includes(i+1)) {
            this._rolled[i] = randInt(1, maxDieRoll);
        }
    }

    --this._rollsRemaining;
    return this._rolled;
};

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Assumes both max and min are integers.
 * Using Math.round() will give you a non-uniform distribution!
 */
function randInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = Round;
