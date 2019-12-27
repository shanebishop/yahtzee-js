'use strict';

var Utils = require('../common/utils');
var Game = require('./game');

function Round (view) {
    this._view = view;
    this._rollsRemaining = Round.MAX_ROLLS;
    this._rolled = [];
    for (var i = 0; i < Game.NUM_DICE_ROLLED; ++i) {
        this._rolled[i] = null;
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
            this._rolled[i] = Utils.randInt(1, maxDieRoll);
        }
    }

    --this._rollsRemaining;
    return this._rolled;
};

Round.parsePosToHold = function (selection) {
    var tokens = selection.trim().split(/\s+/); // Split input on whitespace
    var posToHold = new Set();

    for (var i = 0; i < tokens.length; ++i) {
        var parsed = parseInt(tokens[i]);

        if (!Utils.isInt(tokens[i]) || parsed < 1 || parsed > Game.NUM_DICE_ROLLED) {
            return null; // Index is out of range
        }

        posToHold.add(parsed);
    }

    // Cannot hold more than NUM_DICE_ROLLED-1 positions
    if (posToHold.size >= Game.NUM_DICE_ROLLED) {
        return null;
    }

    return posToHold;
}

module.exports = Round;
