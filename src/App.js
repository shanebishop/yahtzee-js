'use strict';

import React from 'react';
import View from './client/view';
import Game from './client/game';
import Utils from './common/utils';
//import './App.css'; // Uncomment to import CSS for App

var Scorer = require('./client/scorer');

function main () {
    console.log('Hello world');
    var scorer = new Scorer();
    scorer.setScored(Scorer.ONES_CODE);
    console.log('Scored in ones? ', scorer.scored(Scorer.ONES_CODE));
}

class App extends React.Component {
    state = {
        rolled : [4, 3, 5, 2, 5]
    };

    scoreButtonHandler (e) {
        console.log('In App\'s newRoll function, the event is', e);
        var rolled = [];
        for (var i = 0; i < Game.NUM_DICE_ROLLED; ++i) {
            rolled[i] = Utils.randInt(1, 6);
        }
        this.setState({
            rolled : rolled
        });
    }

    render () {
        return (
            <div className="App">
              <header className="App-header">{/* Currently unused */}</header>
              <div>
                <View
                    rolled={this.state.rolled}
                    scoreButtonHandler={this.scoreButtonHandler.bind(this)}
                />
              </div>
            </div>
        );
    }
}

main();

export default App;
