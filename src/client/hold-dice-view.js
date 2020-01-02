'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class HoldDiceView extends React.Component {
    render () {
        if (!this.props.show) {
            return <div></div>;
        }

        return (
            <>
                <p>{'Select one or more of the dice above to hold. Unheld dice will be rerolled.'}</p>
                <button onClick={this.props.diceHeldButtonHandler}>{'Hold selected dice'}</button>
            </>
        );
    }
}

export default HoldDiceView;
