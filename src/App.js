'use strict';

import React from 'react';
import View from './client/view';
import Game from './client/game';
import Utils from './common/utils';
import States from './states';
import './App.css';

var Scorer = require('./client/scorer');

function main () {
    console.log('Hello world');
    var scorer = new Scorer();
    scorer.setScored(Scorer.ONES_CODE);
    console.log('Scored in ones? ', scorer.scored(Scorer.ONES_CODE));
}

class App extends React.Component {
    state = {
        rolled : [4, 3, 5, 2, 5],
        scorer : new Scorer(),
        state : States.START_STATE,
        game : new Game()
    };

    scoreButtonHandler (e) {
        var newState = this.state;
        newState.state = States.SELECT_CAT_STATE;
        this.setState(newState);
    }

    rerollAllButtonHandler (e) {
        var rolled = [];
        for (var i = 0; i < Game.NUM_DICE_ROLLED; ++i) {
            rolled[i] = Utils.randInt(1, 6);
        }

        var newState = this.state;
        newState.rolled = rolled;
        newState.state = this.nextState();

        this.setState(newState);
    }

    nextRoundButtonHandler (e) {
        this.state.game.nextRound();

        var newState = this.state;
        newState.state = States.START_STATE; // TODO Should use a better state
        this.setState(newState);
    }

    holdDiceButtonHandler (e) {
        var newState = this.state;
        newState.state = States.CHOOSE_DICE_TO_HOLD;
        this.setState(newState);
    }

    diceHeldButtonHandler (e) {
        var newState = this.state;

        console.log('Dice held button handler pressed');
        //TODO
    }

    onDieClick (e) {
        console.log('Die was clicked with event', e);
    }

    nextState () {
        var currentState = this.state.state;
        var round = this.state.round;

        // TODO Look at the round to determine what the next state must be,
        // based on the number of rerolls that are still available
        return States.START_STATE; // TODO Should use a better state for this
    }

    scoreForScoreCode (scoreCode) {
        var { rolled, scorer } = this.state;

        if (scoreCode === 'yahtzee') {
            if (scorer.scored(Scorer.FRSTYAHTZEE_CODE)) {
                scoreCode = Scorer.SCNDYAHTZEE_CODE;
            } else {
                scoreCode = Scorer.FRSTYAHTZEE_CODE;
            }
        }

        var score = scorer.score(rolled, scoreCode);

        console.log('Scoring', rolled, 'as',scoreCode,'yields a score of', score);

        var newState = this.state;
        newState.state = States.SELECTED_CAT_STATE;
        newState.roundScore = score;
        this.setState(newState);
    }

    showSelectView () {
        return [States.SELECT_CAT_STATE, States.SELECTED_CAT_STATE].includes(this.state.state);
    }

    showRoundScoreView () {
        return this.state.state === States.SELECTED_CAT_STATE;
    }

    render () {
        return (
            <div className="App">
              <header className="App-header">{/* Currently unused */}</header>
              <div>
                <View
                    game={this.state.game}
                    rolled={this.state.rolled}
                    scoreButtonHandler={this.scoreButtonHandler.bind(this)}
                    rerollAllButtonHandler={this.rerollAllButtonHandler.bind(this)}
                    showSelectView={this.showSelectView()}
                    showRoundScoreView={this.showRoundScoreView()}
                    showHoldDiceView={this.state.state === States.CHOOSE_DICE_TO_HOLD}
                    scoreForScoreCode={this.scoreForScoreCode.bind(this)}
                    roundScore={this.state.roundScore}
                    nextRoundButtonHandler={this.nextRoundButtonHandler.bind(this)}
                    holdDiceButtonHandler={this.holdDiceButtonHandler.bind(this)}
                    diceHeldButtonHandler={this.diceHeldButtonHandler.bind(this)}
                    onDieClick={this.onDieClick.bind(this)}
                />
              </div>
            </div>
        );
    }
}

main();

export default App;
