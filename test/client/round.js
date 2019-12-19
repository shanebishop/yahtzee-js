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
        //assert.equal(expected, Round.parsePosToHold('4 3 2'));
        assert.isTrue(setEqual([4, 3, 2], Round.parsePosToHold('4 3 2')));
    });

});

// WARNING Doesn't actually do set equality
function setEqual (expected, actual) {
    // Need != instead of !==
    if (expected.length != actual.size) {
        return false;
    }

    console.log(setToString(actual));

    var expectedAsSet = new Set(expected);
    var iterator = expectedAsSet.values();

    for (var entry of iterator) {
        if (!actual.has(entry)) {
            return false;
        }
    }

    return true;
}

// TODO Build a string array and then join the string to produce a single string instead
function setToString (set) {
    var iterator = set.values();
    var entries = [], i = 0;
    var ret = '{';

    for (var entry of iterator) {
        entries[i++] = entry;
    }

    for (var i = 0; i < entries.length; ++i) {
        ret = ret + entries[i];
        if (i+1 < entries.length) {
            ret = ret + ',';
        }
    }

    return ret + '}';
}
