'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Scorer from './scorer';

class SelectView extends React.Component {
    catSelectButtonHandler () {
        var scoreCode = document.querySelector('input[name="catSelect"]:checked').value;

        console.log(scoreCode);

        this.props.scoreForScoreCode(scoreCode);
    }

    render () {
        if (!this.props.show) {
            return (
                <div></div>
            );
        }

        return (
            <div className="select-view">
                <p>{'Please select a category to score in:'}</p>
                <div>
                    <input type="radio" id="rb1"
                     name="catSelect" value={Scorer.ONES_CODE} defaultChecked="checked"></input>
                    <label htmlFor="rb1">{'Ones'}</label>

                    <input type="radio" id="rb2"
                     name="catSelect" value={Scorer.TWOS_CODE}></input>
                    <label htmlFor="rb2">{'Twos'}</label>

                    <input type="radio" id="rb3"
                     name="catSelect" value={Scorer.THREES_CODE}></input>
                    <label htmlFor="rb3">{'Threes'}</label>

                    <input type="radio" id="rb4"
                     name="catSelect" value={Scorer.FOURS_CODE}></input>
                    <label htmlFor="rb4">{'Fours'}</label>

                    <input type="radio" id="rb5"
                     name="catSelect" value={Scorer.FIVES_CODE}></input>
                    <label htmlFor="rb5">{'Fives'}</label>

                    <input type="radio" id="rb6"
                     name="catSelect" value={Scorer.SIXES_CODE}></input>
                    <label htmlFor="rb6">{'Sixes'}</label>

                    <input type="radio" id="rb7"
                     name="catSelect" value={Scorer.LGSTRAIGHT_CODE}></input>
                    <label htmlFor="rb7">{'Large Straight'}</label>

                    <input type="radio" id="rb8"
                     name="catSelect" value={Scorer.SMSTRAIGHT_CODE}></input>
                    <label htmlFor="rb8">{'Small Straight'}</label>

                    <input type="radio" id="rb9"
                     name="catSelect" value={Scorer.FULLHOUSE_CODE}></input>
                    <label htmlFor="rb9">{'Full House'}</label>

                    <input type="radio" id="rb10"
                     name="catSelect" value={Scorer.THREEKIND_CODE}></input>
                    <label htmlFor="rb10">{'Three of a Kind'}</label>

                    <input type="radio" id="rb11"
                     name="catSelect" value={Scorer.FOURKIND_CODE}></input>
                    <label htmlFor="rb11">{'Four of a Kind'}</label>

                    <input type="radio" id="rb12"
                     name="catSelect" value={'yahtzee'}></input>
                    <label htmlFor="rb12">{'Yahtzee'}</label>
                </div>
                <button onClick={this.catSelectButtonHandler.bind(this)}>{'Score'}</button>
            </div>
        );
    }
}

export default SelectView;
