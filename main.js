var Scorer = require('./client/scorer');

function main () {
    console.log('Hello world');
    scorer = new Scorer();
    scorer.setScored(Scorer.ONES_CODE);
    console.log('Scored in ones? ', scorer.scored(Scorer.ONES_CODE));
}

main();
