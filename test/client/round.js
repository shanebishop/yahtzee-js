'use strict';

var Round = require('../../client/round');
var Game = require('../../client/game');

var assert = require('chai').assert;
var _ = require('underscore');

describe('Round', function () {

    it('Test holding dice', function () {
        var r = new Round();

        r.roll();
        var initialRoll = r.getRolled();
        var positionsToHold = [1, 3];

        r.roll(positionsToHold);
        var newRoll = r.getRolled();

        assert.equal(Game.NUM_DICE_ROLLED, newRoll.length);
        assert.equal(initialRoll[0], newRoll[0]);
        assert.equal(initialRoll[2], newRoll[2]);
    });

    it('Test holding positions during first roll does not cause nulls to appear in output', function () {
        var r = new Round();
        var posHeld = _.range(Game.NUM_DICE_ROLLED);

        var dieRoll = r.roll(posHeld);
        for (var i = 0; i < dieRoll.length; ++i) {
            assert.isNotNull(dieRoll[i]);
        }
    });

    it('Test parsePosToHold', function () {
        var expected = new Set([4, 3, 2]);
        assert.isTrue(setEqual([4, 3, 2], Round.parsePosToHold('4 3 2')));
    });

    it('Test parseToHold - cannot hold no dice', function () {
        assert.isNull(Round.parsePosToHold(''));
    })

    it('Test parseToHold - cannot hold all dice', function () {
        assert.isNull(Round.parsePosToHold('1 2 3 4 5'));
        assert.isNull(Round.parsePosToHold('5 4 2 3 1'));
    });

    it('Test parseToHold - only one position', function () {
        assert.isTrue(setEqual([4], Round.parsePosToHold('4')));
    });

    it('Test parseToHold - spacing', function () {
        var selection1 = ' 4 5 3 ', selection2 = '\t3\t2 1', selection3 = '5   3     2        ';
        var expected1 = [4, 5, 3];
        var expected2 = [3, 2, 1];
        var expected3 = [5, 3, 2];

        assert.isTrue(setEqual(expected1, Round.parsePosToHold(selection1)));
        assert.isTrue(setEqual(expected2, Round.parsePosToHold(selection2)));
        assert.isTrue(setEqual(expected3, Round.parsePosToHold(selection3)));
    });

    it('Test parsePosToHold - non-integer values', function () {
        assert.isNull(Round.parsePosToHold('Um, do you want 0-based or 1-based positions?'));
        assert.isNull(Round.parsePosToHold('cat'));
        assert.isNull(Round.parsePosToHold('g'));
    });

    it('Test parsePosToHold - duplicate values', function () {
        assert.isTrue(setEqual([5, 4, 3], Round.parsePosToHold('5 4 5 3 4')));
    });

    // Round.canReroll() == true implies all commands are available; Round.canReroll == false implies none are available
    it('Test canReroll', function () {
        var r = new Round();
        assert.isTrue(r.canReroll());

        r.roll();
        assert.isTrue(r.canReroll()); // Rolled once, 2 possible rerolls left

        r.roll();
        assert.isTrue(r.canReroll()); // Rolled twice, 1 possible reroll left

        var lastRollResults = r.roll();
        assert.isFalse(r.canReroll()); // Rolled thrice, cannot reroll further

        // No matter how often the dice are rolled after no more rolling can occur,
        // the same results should be returned
        assert.equal(lastRollResults, r.roll());
        assert.equal(lastRollResults, r.getRolled());
        assert.equal(lastRollResults, r.roll());
        assert.equal(lastRollResults, r.getRolled());
    });

});

// expected should be an array, actual should be a Set object
function setEqual (expected, actual) {
    var expectedAsSet = new Set(expected);
    var iterator = expectedAsSet.values();

    if (expectedAsSet.size !== actual.size) {
        return false;
    }

    for (var entry of iterator) {
        if (!actual.has(entry)) {
            return false;
        }
    }

    return true;
}

function setToString (set) {
    var entries = [], i = 0, iterator = set.values();

    for (var entry of iterator) {
        entries[i++] = entry.toString();
    }

    return ['{', entries.join(','), '}'].join('');
}
