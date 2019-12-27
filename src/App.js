'use strict';

import React from 'react';
import View from './client/view';
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

    newRoll () {
        console.log('In App\'s newRoll function');
        this.setState({
            rolled : [6,6,6,6,6]
        });
    }

    render () {
        return (
            <div className="App">
              <header className="App-header">{/* Currently unused */}</header>
              <div>
                <View
                    rolled={this.state.rolled}
                    newRoll={this.newRoll.bind(this)}
                />
              </div>
            </div>
        );
    }
}

main();

export default App;
