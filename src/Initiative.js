import React, { Component } from 'react';
import AddCharacterForm from './AddCharacterForm.js';
import Character from './Character.js';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';

import './Initiative.css';

class Initiative extends Component {
  constructor(props) {
    super(props);
    this.state = {characters: [], round: 1, turn: null};

    this.addCharacter = this.addCharacter.bind(this);
    this.moveCharacter = this.moveCharacter.bind(this);
    this.nextTurn = this.nextTurn.bind(this);
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
    if (this.state.turn == null) {
      turn = this.state.characters[0];
    } else {
      let index = this.state.characters.indexOf(this.state.turn);
      index = index+1;
      turn = this.state.characters[index%this.state.characters.length];
      if (index === this.state.characters.length) {
        round = round+1;
      }
    }
    this.setState({turn: turn, round: round});
  }

  render() {
    const turn = this.state.turn;
    const listItems = this.state.characters.map((character) =>
      <Character character={character}
                 moveCharacter={this.moveCharacter}
                 removeCharacter={this.removeCharacter}
                 turn={turn}
                 initiative={this} />
    );

    return (
      <Card>
        <CardContent>
          <h3>Round {this.state.round}</h3>
          <Button variant="contained" color="primary" onClick={this.nextTurn}>Next</Button>
          <div className="Initiative">
            <List classes="Initiatve-list">
              {listItems}
            </List>
          </div>
          <AddCharacterForm addCharacter={this.addCharacter}/>
        </CardContent>
      </Card>
    );
  }
}

export default Initiative;
