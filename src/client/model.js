'use strict';

var MessageParser = require('../common/message-parser');

var _ = require('underscore');

/**
 * Implements the Model for the client
 * The init() function must be called before calling any other function
 */

function Model () {
    this._round = 0;
    this._playerScores = null;
    this._playerScore = undefined;
    this._playerID = undefined;
}

Model.prototype.getRound = function () { return this._round; }
Model.prototype.getPlayerID = function () { return this._playerID; }
Model.prototype.getPlayerScore = function () { return this._playerScore; }
Model.prototype.getPlayerScoreByID = function (id) { return this._playerScores[id]; }
Model.prototype.getPlayerScores = function () { return _.values(this._playerScores); }

Model.prototype.init = function (readyToStartMessage) {
    this._playerID = MessageParser.getPlayerID(readyToStartMessage);

    var playerInfos = MessageParser.getPlayerInfos(readyToStartMessage);
    this._playerScores = {};

    var sortedIDs = sort(_.values(playerInfos));

    for (var i = 0; i < sortedIDs.length; ++i) {
        var id = sortedIDs[i];
        var pScore = new PlayerScore(id, playerInfos[id]);
        this._playerScores[id] = pScore;

        if (id === this._playerID) {
            this._playerScore = pScore;
        }
    }
}

Model.prototype.incrementRound = function() {
    ++this._round;
}

Model.prototype.updateScore = function (payload) {
    throw new Error('TODO Implement updateScore');
}

Model.prototype.canScoreInCategory = function (categoryNumber) {
    return this._playerScore.getScorer().canScore(categoryNumber);
}

Model.prototype.scoredInCategory = function (scoreCode) {
    return this._playerScore.getScorer().scored(scoreCode);
}

Model.prototype.scoredFirstYahtzee = function () {
    return this.scoredInCategory(Scorer.FRSTYAHTZEE_CODE);
}

Model.prototype.scoredSecondYahtzee = function () {
    return this.scoredInCategory(Scorer.SCNDYAHTZEE_CODE);
}

Model.prototype.numToScoreCode = function (number) {
    return this._playerScore.getScorer().numToScoreCode(number);
}

module.exports = Model;
