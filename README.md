# yahtzee-js

This repository has the source code for a basic yahtzee game, written in JavaScript
and React. I created this repository with the intention of teaching myself
React.

README last updated January 2, 2020.

This project is currently in progress, and is not complete. Below is a
description of how this webapp works as of the date above.

This webapp is very barebones at the moment, but it should be noted I have only
worked on this for two weeks, and I started this project with no React experience
whatsoever. I believe the fact I was able to create this much so quickly with
no prior React knowledge demonstrates that I can learn new frameworks and
technologies quickly and with ease.

## Usage and Screenshots

After cloning this repository, dependencies can be installed with `npm install`.
After installing dependencies, the server can be launched with `npm start`, and
then the webapp can be accessed in a browser at [localhost:3000](http://localhost:3000/).

When the app is first launched, the first roll is displayed, as below:

![Initial display](https://raw.githubusercontent/shanebishop/yahtzee-js/master/doc/img/initial-display.png)

When the player scores a roll, they can choose which category they want to score
in. After scoring, the number of points they earned that round is displayed.

![Scoring](https://raw.githubusercontent/shanebishop/yahtzee-js/master/doc/img/scoring.png)

After clicking the "Continue to next round" button, the scoring part of the page
is removed, and the round number is updated.

![Next round](https://raw.githubusercontent/shanebishop/yahtzee-js/master/doc/img/next-round.png)

Pressing the "Reroll all" button rerolls all dice. After pressing reroll all
on the roll above:

![After reroll](https://raw.githubusercontent/shanebishop/yahtzee-js/master/doc/img/after-reroll.png)

![After reroll](https://raw.github.com/shanebishop/yahtzee-js/master/doc/img/after-reroll.png?sanitize=true)

The "Choose some dice to hold" button's functionality is in progress. At the
moment it only prompts the player to choose which dice to hold. When the
functionality is complete, selected dice will be indicated by a change in color,
and all unheld dice will be rerolled, leaving the selected dice unchanged. The
player will be able to toggle any position from selected to unselected as much
as they want before finalizing their choice by clicking the "Hold selected" dice
button.

Below is the current display for holding dice:

![In progress holding dice display](https://raw.githubusercontent/shanebishop/yahtzee-js/master/doc/img/holding-dice.png)
