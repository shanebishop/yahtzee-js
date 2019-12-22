'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

//class Die extends React.Component

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
    constructor (props) {
        super(props);

        props = props || {};

        this._rolled = props.rolled;
        this.state = {};
        this.state.rolled = props.rolled;
        //this.setState(props);
    }

    renderDie (i) {
        //return <Die value={i} />;
        return <Die value={this.props.rolled[i]} />
    }

    setRolled (rolled) {
        this._rolled = rolled;
        this.state.rolled = rolled;
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
    constructor () {
        super();
        this._rolled = [4, 3, 5, 2, 5];
        this.state = {rolled : this._rolled};
    }

    setRolled (rolled) {
        this._rolled = rolled;
        //this._board.setRolled(rolled);
        this.state = {rolled : this._rolled};
        //this.setState({rolled : rolled});
        console.log('this._rolled is now', this._rolled);
    }

    render () {
        const rolled = this.state.rolled;
        console.log('Attempting to render view with rolled', this.state.rolled);
        return (
            <div className="game-board">
                <Board rolled={rolled} />
                <button onClick={newRoll.bind(this)}>{'asdfasdf'}</button>
            </div>
        );
    }
}

function newRoll () {
    this.setRolled([6,6,6,6,6]);
    this.render();
}

ReactDOM.render(<View />, document.getElementById('root'));

export default View;
