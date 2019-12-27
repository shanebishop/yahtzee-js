'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

// Displays the score the player got this round
class RoundScore extends React.Component {
    render () {
        if (!this.props.show) {
            return (
                <div></div>
            );
        }

        return (
            <div>
                <p>{'Scored ' + this.props.score + ' points this round.'}</p>
                <button onClick={this.props.nextRoundButtonHandler}>{'Continue to next round'}</button>
            </div>
        );
    }
}

export default RoundScore;
