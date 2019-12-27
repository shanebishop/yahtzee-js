'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import SelectView from './select-view';
import RoundScore from './round-score';

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

    scoreButtonHandler (e) {
        return this.props.scoreButtonHandler(e);
    }

    rerollAllButtonHandler (e) {
        return this.props.rerollAllButtonHandler(e);
    }

    render () {
        const rolled = this.props.rolled;
        console.log('Attempting to render view with rolled', this.props.rolled);
        return (
            <div className="game-board">
                <p>{'On round ' + this.props.game.getRound() + '.'}</p>
                <Board rolled={rolled} />
                <button onClick={this.scoreButtonHandler.bind(this)}>{'Score roll'}</button>
                <button onClick={this.rerollAllButtonHandler.bind(this)}>{'Reroll all'}</button>
                <SelectView
                    show={this.props.showSelectView}
                    scoreForScoreCode={this.props.scoreForScoreCode}
                />
                <RoundScore
                    show={this.props.showRoundScoreView}
                    score={this.props.roundScore}
                    nextRoundButtonHandler={this.props.nextRoundButtonHandler}
                />
            </div>
        );
    }
}

export default View;
