'use strict';

var Round = require('../../client/round');
var Game = require('../../client/game');

var assert = require('chai').assert;

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

});
