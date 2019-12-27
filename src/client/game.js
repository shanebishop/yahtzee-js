'use strict';

function Game () {
    this.round = 1;
}

Game.NUM_DICE_ROLLED = 5;

Game.prototype.nextRound = function () {
    ++this.round;
};

Game.prototype.getRound = function () {
    return this.round;
};

module.exports = Game;
