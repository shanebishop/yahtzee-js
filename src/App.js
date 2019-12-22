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

    var view = new View();
    view.setRolled([6,6,6,6,6]);
    console.log('Calling view.render()');
    view.render();

    //updateView(view);
    setTimeout(updateView.bind(null, view), 4000);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">{/* Currently unused */}</header>
      <div>
        <View />
      </div>
    </div>
  );
}

function updateView (view) {
    view.setRolled([6, 6, 6, 6, 6]);
    view.render();
    //view.setState({ rolled : [6, 6, 6, 6, 6, 6] });
    view.setRolled([6, 6, 6, 6, 6]);
    //setTimeout(updateView.bind(null, view), 4000);
}

main();

export default App;
