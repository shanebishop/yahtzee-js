var assert = require('chai').assert;
var Scorer = require('../../client/scorer')

describe('Scorer', function () {

    it('Test scoring in ones with ones', function () {
        s = new Scorer();
        dieRolls = [1, 1, 3, 1, 5];
        var actual = s.score(dieRolls, Scorer.ONES_CODE);

        assert.equal(3, actual);
        assert.isTrue(s.scored(Scorer.ONES_CODE));
    });

    it('Test scoring in twos with no twos', function () {
        s = new Scorer();
        dieRolls = [5, 6, 4, 3, 4];
        var actual = s.score(dieRolls, Scorer.TWOS_CODE);

        assert.equal(0, actual);
        assert.isTrue(s.scored(Scorer.TWOS_CODE));
    });

});
