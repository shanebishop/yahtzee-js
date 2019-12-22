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

main();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello, I have text
        </p>
      </header>
      <div>
        <View />
      </div>
    </div>
  );
}

export default App;
