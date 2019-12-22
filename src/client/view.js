'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

//class Die extends React.Component

class Die extends React.Component {
    render () {
        return (
            <img
                src="img/die1.png"
                alt="my image"
                height="70"
                width="70"
                onClick={() => console.log('Button pressed')}
            />
        );
    }
}

class Board extends React.Component {
    renderDie (i) {
        return <Die value={i} />;
    }

    render () {
        return (
            <div>
                <div className="die-rolls">
                    {this.renderDie(1)}
                    {this.renderDie(2)}
                    {this.renderDie(3)}
                    {this.renderDie(4)}
                    {this.renderDie(5)}
                </div>
            </div>
        );
    }
}

class View extends React.Component {
    render () {
        return (
            <div className="game-board">
                <Board />
            </div>
        );
    }
}

ReactDOM.render(<View />, document.getElementById('root'));

export default View;
