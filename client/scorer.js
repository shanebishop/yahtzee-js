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

    if (isUpperScoreCode(scoreCode)) {
        score = scoreForUpperSection(dieRoll, scoreCode);
    } else if (scoreCode === LGSTRAIGHT_CODE) {
        score = scoreAsLargeStraight(dieRoll);
    }
    // TODO Rest of cases

    this._scored.add(scoreCode);
    return score;
};

function isUpperScoreCode (scoreCode) {
    return Scorer.upperScoreCodes.has(scoreCode);
}

function scoreForUpperSection (dieRoll, scoreCode) {
    var codeToDieRoll = {};
    codeToDieRoll[Scorer.ONES_CODE] = 1;
    codeToDieRoll[Scorer.TWOS_CODE] = 2;
    codeToDieRoll[Scorer.THREES_CODE] = 3;
    codeToDieRoll[Scorer.FOURS_CODE] = 4;
    codeToDieRoll[Scorer.FIVES_CODE] = 5;
    codeToDieRoll[Scorer.SIXES_CODE] = 6;
    console.log(codeToDieRoll);

    var score = 0;
    for (var i = 0; i < dieRoll.length; ++i) {
        if (dieRoll[i] === codeToDieRoll[scoreCode]) {
            score += dieRoll[i];
        }
    }

    return score;
}

module.exports = Scorer;
