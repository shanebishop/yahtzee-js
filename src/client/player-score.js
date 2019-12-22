'use strict';

/**
 * Represents a player's score
 */

var Scorer = require('./scorer');

function PlayerScore (id, name, scorer) {
    this._playerID = id;
    this._playerName = name || PlayerScore.DEFAULT_NAME;
    this._scorer = s || new Scorer();

    this._score = 0;
    this._ones = this._twos = this._threes = this._fours = this._fives = this._sixes = 0;
    this._bonus = this._largeStraight = this._smallStraight = this._fullHouse = 0;
    this._threeOfAKind = this._fourOfAKind = this._chance = this._yahtzee = 0;
    this._upperScoreTotal = 0;
}

PlayerScore.DEFAULT_NAME = 'Unknown';

PlayerScore.prorotype.getID = function () { return this._playerID; }
PlayerScore.prorotype.getPlayerName = function () { return this._playerName; }
PlayerScore.prorotype.getScore = function () { return this._score; }
PlayerScore.prorotype.getUpperScoreTotal = function () { return this._upperScoreTotal; }
PlayerScore.prorotype.getScorer = function () { return this._scorer; }
PlayerScore.prorotype.bonusScored = function () { return this._bonus != 0; }

PlayerScore.prototype.getOnesStr = function () { return this._scorer.scored(Scorer.ONES_CODE) ? this._ones.toString() : ''; }
PlayerScore.prototype.getTwosStr = function () { return this._scorer.scored(Scorer.TWOS_CODE) ? this._twos.toString() : ''; }
PlayerScore.prototype.getThreesStr = function () { return this._scorer.scored(Scorer.THREES_CODE) ? this._threes.toString() : ''; }
PlayerScore.prototype.getFoursStr = function () { return this._scorer.scored(Scorer.FOURS_CODE) ? this._fours.toString() : ''; }
PlayerScore.prototype.getFivesStr = function () { return this._scorer.scored(Scorer.FIVES_CODE) ? this._fives.toString() : ''; }
PlayerScore.prototype.getSixesStr = function () { return this._scorer.scored(Scorer.SIXES_CODE) ? this._sixes.toString() : ''; }
PlayerScore.prototype.getBonusStr = function () { return this._scorer.scored(Scorer.BONUS_CODE) ? this._bonus.toString() : ''; }
PlayerScore.prototype.getLargeStraightStr = function () { return this._scorer.scored(Scorer.LGSTRAIGHT_CODE) ? this._largeStraight.toString() : ''; }
PlayerScore.prototype.getSmallStr = function () { return this._scorer.scored(Scorer.SMSTRAIGHT_CODE) ? this._smallStraight.toString() : ''; }
PlayerScore.prototype.getFullHouseStr = function () { return this._scorer.scored(Scorer.FULLHOUSE_CODE) ? this._fullHouse.toString() : ''; }
PlayerScore.prototype.getThreeOfAKindStr = function () { return this._scorer.scored(Scorer.THREEKIND_CODE) ? this._threeOfAKind.toString() : ''; }
PlayerScore.prototype.getFourOfAKindStr = function () { return this._scorer.scored(Scorer.FOURKIND_CODE) ? this._fourOfAKind.toString() : ''; }
PlayerScore.prototype.getChanceStr = function () { return this._scorer.scored(Scorer.CHANCE_CODE) ? this._chance.toString() : ''; }
PlayerScore.prototype.getYahtzeeStr = function () { return this._scorer.scored(Scorer.FRSTYAHTZEE_CODE) ? this._yahtzee.toString() : ''; }

PlayerScore.prototype.updateCategory = function (category, score) {
    this._scorer.setScored(category);
    this._score += score;
    handleBonus(category, score); // Determine if bonus score should be applied

    switch (category) {
        case Scorer.ONES_CODE:
            this._ones += score;
            break;
        case Scorer.TWOS_CODE:
            this._twos += score;
            break;
        case Scorer.THREES_CODE:
            this._threes += score;
            break;
        case Scorer.FOURS_CODE:
            this._fours += score;
            break;
        case Scorer.FIVES_CODE:
            this._fives += score;
            break;
        case Scorer.SIXES_CODE:
            this._sixes += score;
            break;
        case Scorer.BONUS_CODE:
            throw new Error('Clients should never receive bonus code messages.');
            break;
        case Scorer.LGSTRAIGHT_CODE:
            this._largeStraight += score;
            break;
        case Scorer.SMSTRAIGHT_CODE:
            this._smallStraight += score;
            break;
        case Scorer.FULLHOUSE_CODE:
            this._fullHouse += score;
            break;
        case Scorer.THREEKIND_CODE:
            this._threeOfAKind += score;
            break;
        case Scorer.FOURKIND_CODE:
            this._fourOfAKind += score;
            break;
        case Scorer.CHANCE_CODE:
            this._chance += score;
            break;
        case Scorer.FRSTYAHTZEE_CODE:
            // Fall through
        case Scorer.SCNDYAHTZEE_CODE:
            this._yahtzee += score;
            break;
        default:
            throw new ('Unrecognized category \'' + category + '\'.');
            break;
    }
}

PlayerScore.prototype.updateForSecondYahtzee = function (dieRoll, category) {
    if (!category) {
        category = this._scorer.numToScoreCode(dieRoll[0].toString());
    }

    var score = this._scorer.score(dieRoll, category);
    this.updateCategory(category, score);
}

// Handle chance that this score triggers awarding of bonus score
function handleBonus (category, score) {
    if (Scorer.upperScoreCodes.has(category)) {
        this._upperScoreTotal += score;
    }

    if (!this._bonusScored() && this._upperScoreTotal >= Scorer.MIN_SCORE_FOR_BONUS) {
        this._bonus = Scorer.BONUS_SCORE;
        this._score += Scorer.BONUS_SCORE;
        this._scorer.setScored(Scorer.BONUS_CODE);
    }
}

module.exports = PlayerScore;
