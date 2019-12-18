var assert = require('chai').assert;
var Scorer = require('../../client/scorer')

describe('Scorer', function () {

    it('Test scoring in ones with ones', function () {
        var s = new Scorer();
        var dieRolls = [1, 1, 3, 1, 5];
        var actual = s.score(dieRolls, Scorer.ONES_CODE);

        assert.equal(3, actual);
        assert.isTrue(s.scored(Scorer.ONES_CODE));
    });

    it('Test scoring in twos with no twos', function () {
        var s = new Scorer();
        var dieRolls = [5, 6, 4, 3, 4];
        var actual = s.score(dieRolls, Scorer.TWOS_CODE);

        assert.equal(0, actual);
        assert.isTrue(s.scored(Scorer.TWOS_CODE));
    });

    it('Test isValidCategory', function () {
        assert.isFalse(Scorer.isValidCategory("-1"));
        assert.isFalse(Scorer.isValidCategory("0"));

        assert.equal(Scorer.NUM_CATEGORIES, 13);

        for (var i = 1; i <= Scorer.NUM_CATEGORIES; ++i) {
            assert.isTrue(Scorer.isValidCategory(i.toString()),
                    'Value in [1,13] was not seen as a valid category');
        }

        assert.isFalse(Scorer.isValidCategory("2.5"), '2.5 was seen as a valid category');
        assert.isFalse(Scorer.isValidCategory("a"));
        assert.isFalse(Scorer.isValidCategory("str"));
        assert.isFalse(Scorer.isValidCategory(""));
        assert.isFalse(Scorer.isValidCategory(null));
    });

    it('Can score in ones category', function () {
        var s = new Scorer();
        var dieRolls = [1, 1, 1, 3, 5];
        var scored = s.score(dieRolls, Scorer.ONES_CODE);
        assert.equal(3, scored);
    });

    it('Can score in twos category', function () {
        var s = new Scorer();
        var dieRolls = [2, 2, 2, 3, 5];
        var scored = s.score(dieRolls, Scorer.TWOS_CODE);
        assert.equal(6, scored);
    });

    it('Can score in threes category', function () {
        var s = new Scorer();
        var dieRolls = [2, 2, 2, 3, 5];
        var scored = s.score(dieRolls, Scorer.THREES_CODE);
        assert.equal(3, scored);
    });

    it('Can score in fours category', function () {
        var s = new Scorer();
        var dieRolls = [4, 4, 4, 3, 5];
        var scored = s.score(dieRolls, Scorer.FOURS_CODE);
        assert.equal(12, scored);
    });

    it('Can score in fives category', function () {
        var s = new Scorer();
        var dieRolls = [2, 2, 2, 3, 5];
        var scored = s.score(dieRolls, Scorer.FIVES_CODE);
        assert.equal(5, scored);
    });

    it('Can score in sixes category', function () {
        var s = new Scorer();
        var dieRolls = [6, 6, 6, 3, 5];
        var scored = s.score(dieRolls, Scorer.SIXES_CODE);
        assert.equal(18, scored);
    });

    it('Can score in large straight category', function () {
        var s = new Scorer();
        var dieRolls = [1, 2, 3, 4, 5];
        var scored = s.score(dieRolls, Scorer.LGSTRAIGHT_CODE);
        assert.equal(Scorer.LGSTRAIGHT_SCORE, scored);
    });

    it('Can score in large straight category - reversed', function () {
        var s = new Scorer();
        var dieRolls = [6, 5, 4, 3, 2];
        var scored = s.score(dieRolls, Scorer.LGSTRAIGHT_CODE);
        assert.equal(Scorer.LGSTRAIGHT_SCORE, scored);
    });

    it('Can score in large straight category - scrambled', function () {
        var s = new Scorer();
        var dieRolls = [5, 3, 2, 4, 1];
        var scored = s.score(dieRolls, Scorer.LGSTRAIGHT_CODE);
        assert.equal(Scorer.LGSTRAIGHT_SCORE, scored);
    });

    it('Can score in small straight category', function () {
        var s = new Scorer();
        var dieRolls = [1, 2, 3, 4, 6];
        var scored = s.score(dieRolls, Scorer.SMSTRAIGHT_CODE);
        assert.equal(Scorer.SMSTRAIGHT_SCORE, scored);
    });

    it('Can score in small straight category - duplicates in roll', function () {
        var s = new Scorer();
        var dieRolls = [3, 6, 5, 4, 5];
        var scored = s.score(dieRolls, Scorer.SMSTRAIGHT_CODE);
        assert.equal(Scorer.SMSTRAIGHT_SCORE, scored);
    });

    it('Can score in small straight category - reversed', function () {
        var s = new Scorer();
        var dieRolls = [1, 6, 5, 4, 3];
        var scored = s.score(dieRolls, Scorer.SMSTRAIGHT_CODE);
        assert.equal(Scorer.SMSTRAIGHT_SCORE, scored);
    });

    it('Can score in small straight category - scrambled', function () {
        var s = new Scorer();
        var dieRolls = [1, 4, 5, 6, 3];
        var scored = s.score(dieRolls, Scorer.SMSTRAIGHT_CODE);
        assert.equal(Scorer.SMSTRAIGHT_SCORE, scored);
    });

    it('Can score in small straight category when a large straight is also possible', function () {
        var s = new Scorer();
        var dieRolls = [6, 5, 4, 3, 2];
        var scored = s.score(dieRolls, Scorer.SMSTRAIGHT_CODE);
        assert.equal(Scorer.SMSTRAIGHT_SCORE, scored);
    });

    it('Can score in full house category', function () {
        var s = new Scorer();
        var dieRolls = [2, 2, 2, 3, 3];
        var scored = s.score(dieRolls, Scorer.FULLHOUSE_CODE);
        assert.equal(Scorer.FULLHOUSE_SCORE, scored);
    });

    it('Can score in three of a kind category', function () {
        var s = new Scorer();
        var dieRolls = [2, 2, 2, 3, 5];

        var rollSum = 0;
        for (var i = 0; i < dieRolls.length; ++i) {
            rollSum += dieRolls[i];
        }

        var scored = s.score(dieRolls, Scorer.THREEKIND_CODE);
        assert.equal(rollSum, scored);
    });

    it('Can score in three of a kind category when die roll is four of a kind', function () {
        var s = new Scorer();
        var dieRolls = [1, 1, 1, 1, 3];

        var rollSum = 0;
        for (var i = 0; i < dieRolls.length; ++i) {
            rollSum += dieRolls[i];
        }

        var scored = s.score(dieRolls, Scorer.THREEKIND_CODE);
        assert.equal(rollSum, scored);
    });

    it('Can score in four of a kind category', function () {
        var s = new Scorer();
        var dieRolls = [6, 4, 4, 4, 4];

        var rollSum = 0;
        for (var i = 0; i < dieRolls.length; ++i) {
            rollSum += dieRolls[i];
        }

        var scored = s.score(dieRolls, Scorer.FOURKIND_CODE);
        assert.equal(rollSum, scored);
    });

    it('Can score in four of a kind category when die roll is 5 of a kind', function () {
        var s = new Scorer();
        var dieRolls = [5, 5, 5, 5, 5];

        var rollSum = 0;
        for (var i = 0; i < dieRolls.length; ++i) {
            rollSum += dieRolls[i];
        }

        var scored = s.score(dieRolls, Scorer.FOURKIND_CODE);
        assert.equal(rollSum, scored);
    });

    it('Can score in chance category', function () {
        var s = new Scorer();
        var dieRolls = [2, 5, 1, 3, 5];

        var rollSum = 0;
        for (var i = 0; i < dieRolls.length; ++i) {
            rollSum += dieRolls[i];
        }

        var scored = s.score(dieRolls, Scorer.CHANCE_CODE);
        assert.equal(rollSum, scored);
    });

    it('Can score in score first yahtzee in yahtzee cateogory', function () {
        var s = new Scorer();
        var dieRolls = [3, 3, 3, 3, 3];
        var scored = s.score(dieRolls, Scorer.FRSTYAHTZEE_CODE);
        assert.equal(Scorer.FRSTYAHTZEE_SCORE, scored);
    });

});
