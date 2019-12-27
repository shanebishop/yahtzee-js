'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class Die extends React.Component {
    render () {
        return (
            <img
                src={"img/die" + this.props.value +".png"}
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
        return <Die value={this.props.rolled[i]} />
    }

    render () {
        return (
            <div>
                <div className="die-rolls">
                    {this.renderDie(0)}
                    {this.renderDie(1)}
                    {this.renderDie(2)}
                    {this.renderDie(3)}
                    {this.renderDie(4)}
                </div>
            </div>
        );
    }
}

class View extends React.Component {
    state = {};

    newRoll () {
        return this.props.newRoll();
    }

    render () {
        const rolled = this.props.rolled;
        console.log('Attempting to render view with rolled', this.props.rolled);
        return (
            <div className="game-board">
                <Board rolled={rolled} />
                <button onClick={this.newRoll.bind(this)}>{'asdfasdf'}</button>
            </div>
        );
    }
}

export default View;
