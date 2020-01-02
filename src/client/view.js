'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import SelectView from './select-view';
import RoundScore from './round-score';
import HoldDiceView from './hold-dice-view';

class Die extends React.Component {
    // TODO Can maybe extract the position from the alt attribute, or maybe I can add a custom attribute to retrieve
    // Either way, in App.js, I think I can extract things with e.target.getAttribute('attributeNameAsString')
    render () {
        return (
            <img
                src={'img/die' + this.props.value + '.png'}
                alt="my image"
                height="70"
                width="70"
                onClick={this.props.onClick}
            />
        );
    }
}

class Board extends React.Component {
    renderDie (i) {
        return <Die value={this.props.rolled[i]} onClick={this.props.onDieClick} />
    }

    render () {
        return (
            <>
                <div className="die-rolls">
                    {this.renderDie(0)}
                    {this.renderDie(1)}
                    {this.renderDie(2)}
                    {this.renderDie(3)}
                    {this.renderDie(4)}
                </div>
            </>
        );
    }
}

class View extends React.Component {
    render () {
        var rolled = this.props.rolled;

        return (
            <div className="game-board">
                <p>{'On round ' + this.props.game.getRound() + '.'}</p>
                <Board rolled={rolled} onDieClick={this.props.onDieClick} />
                <button onClick={this.props.scoreButtonHandler}>{'Score roll'}</button>
                <button onClick={this.props.rerollAllButtonHandler}>{'Reroll all'}</button>
                <button onClick={this.props.holdDiceButtonHandler}>{'Choose some dice to hold'}</button>
                <SelectView
                    show={this.props.showSelectView}
                    scoreForScoreCode={this.props.scoreForScoreCode}
                />
                <RoundScore
                    show={this.props.showRoundScoreView}
                    score={this.props.roundScore}
                    nextRoundButtonHandler={this.props.nextRoundButtonHandler}
                />
                <HoldDiceView
                    show={this.props.showHoldDiceView}
                    diceHeldButtonHandler={this.props.diceHeldButtonHandler}
                />
            </div>
        );
    }
}

export default View;
