import React, { Component } from 'react';
import AddCharacterForm from './AddCharacterForm.js';
import Character from './Character.js';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';

import './Initiative.css';


class Initiative extends Component {
  INITIAL_STATE = {characters: [], round: 1, turn: null, time: 0};

  constructor(props) {
    super(props);
    this.state = this.INITIAL_STATE;

    this.addCharacter = this.addCharacter.bind(this);
    this.moveCharacter = this.moveCharacter.bind(this);
    this.nextTurn = this.nextTurn.bind(this);
    this.reset = this.reset.bind(this);
    this.clear = this.clear.bind(this);
  }

  addCharacter(character) {
    let characters = this.state.characters
        .concat(character)
        .sort(this.byIndexAndRoll);
    this.setState({characters: characters});
  }

  byIndexAndRoll(a,b) {
    const rollDiff = b.roll - a.roll;
    if (rollDiff !== 0) {
      return rollDiff;
    }

    return b.sortIndex - a.sortIndex;
  }

  moveCharacter(index, event) {
    event.preventDefault();

    const characters = this.state.characters
      .map((character,i) => {
        if (character.index === index) {
          let prevSortDiff = 0;
          if (i > 0) {
            prevSortDiff = this.state.characters[i-1].sortIndex-character.sortIndex;
          }
          character.sortIndex += (prevSortDiff + 1);
        }
        return character;
      }).sort(this.byIndexAndRoll);

    this.setState({characters: characters});
  }

  removeCharacter(index, event) {
    event.preventDefault();
    if (this.state.turn && this.state.turn.index === index) {
      this.nextTurn();
    }
    const characters = this.state.characters
      .filter((character) => character.index !== index);
    this.setState({characters: characters});
  }

  nextTurn() {
    let turn = null;
    let round = this.state.round;
    let time = this.state.time;
    if (this.state.turn == null) {
      turn = this.state.characters[0];
    } else {
      let index = this.state.characters.indexOf(this.state.turn);
      index = index+1;
      turn = this.state.characters[index%this.state.characters.length];
      if (index === this.state.characters.length) {
        round += 1;
        time += 6;
      }
    }
    this.setState({turn: turn, round: round, time: time});
  }

  reset() {
    this.setState({
        turn: this.INITIAL_STATE.turn,
        round: this.INITIAL_STATE.round,
        time: this.INITIAL_STATE.time,
    });
  }

  clear() {
    this.setState(this.INITIAL_STATE);
  }

  roundTitle() {
    return `Round ${this.state.round}`;
  }

  roundTime() {
    const roundMinutes = Math.floor(this.state.time / 60);
    const roundSeconds = (this.state.time % 60).toString().padStart(2, "0");

    return `${roundMinutes}:${roundSeconds}`;
  }

  getListItems() {
    return this.state.characters.map((character) =>
        <Character character={character}
                   moveCharacter={this.moveCharacter}
                   removeCharacter={this.removeCharacter}
                   turn={this.state.turn}
                   initiative={this} />
      );
  }

  render() {
    return (
      <Card>
        <CardHeader title={this.roundTitle()} subheader={this.roundTime()}/>
        <CardContent>
          <div className="Initiative-actions">
            <Button variant="contained" color="primary" onClick={this.nextTurn}>Next</Button>
            <Button variant="contained" color="secondary" onClick={this.reset}>Reset</Button>
            <Button variant="contained" color="secondary" onClick={this.clear}>Clear</Button>
          </div>
          <div className="Initiative">
            <List classes="Initiatve-list">
              {this.getListItems()}
            </List>
          </div>
          <AddCharacterForm addCharacter={this.addCharacter}/>
        </CardContent>
      </Card>
    );
  }
}

export default Initiative;
