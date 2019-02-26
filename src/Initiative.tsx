import React, { Component } from 'react';
import AddCharacterForm from './AddCharacterForm';
import Character, {CharacterData} from './Character';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import Hidden from '@material-ui/core/Hidden';
import IconSkipNext from '@material-ui/icons/SkipNext';
import IconDeleteSweep from '@material-ui/icons/DeleteSweep';
import IconRotateLeft from '@material-ui/icons/RotateLeft';

import './Initiative.css';

class InitiativeState {
   characters: Array<CharacterData> = [];
   round: number = 1;
   turn?: number;
   time: number = 0;
   index: number = 1;
}

const INITIAL_STATE = new InitiativeState();

class Initiative extends Component<{}, InitiativeState> {

  constructor(props : any) {
    super(props);
    this.state = INITIAL_STATE;

    this.addCharacter = this.addCharacter.bind(this);
    this.moveCharacter = this.moveCharacter.bind(this);
    this.nextTurn = this.nextTurn.bind(this);
    this.reset = this.reset.bind(this);
    this.clear = this.clear.bind(this);
  }

  componentDidMount() {
    let storageState = localStorage.getItem("state");
    if (storageState !== null) {
      this.setState(JSON.parse(storageState));
    }
  }

  saveState() {
    localStorage.setItem("state", JSON.stringify(this.state));
  }

  addCharacter(character: CharacterData) {
    let characters = this.state.characters
        .concat(character)

    let index = this.state.index + 1;

    this.setState({characters: characters, index: index}, this.saveState);
  }

  byIndexAndRoll(a: CharacterData, b: CharacterData) {
    const rollDiff = b.roll - a.roll;
    if (rollDiff !== 0) {
      return rollDiff;
    }

    return b.sortIndex - a.sortIndex;
  }

  moveCharacter(index: number, event: React.MouseEvent<HTMLInputElement>) {
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

    this.setState({characters: characters}, this.saveState);
  }

    removeCharacter(index: number, event: React.MouseEvent<HTMLInputElement>) {
    event.preventDefault();
    if (this.state.turn && this.state.turn === index) {
      this.nextTurn();
    }
    const characters = this.state.characters
      .filter((character) => character.index !== index);
    this.setState({characters: characters}, this.saveState);
  }

  nextTurn() {
    if (this.state.characters.length === 0) {
      return;
    }
    let turn = this.state.turn;
    let round = this.state.round;
    let time = this.state.time;
    let index = this.state.characters.findIndex((character: CharacterData) => character.index === turn);
    if (index === -1) {
      index = 0;
    } else {
      index = index+1;
    }
    turn = this.state.characters[index%this.state.characters.length].index;
    if (index === this.state.characters.length) {
      round += 1;
      time += 6;
    }
    this.setState({turn: turn, round: round, time: time}, this.saveState);
  }

  reset() {
    this.setState({
        turn: INITIAL_STATE.turn,
        round: INITIAL_STATE.round,
        time: INITIAL_STATE.time,
    }, this.saveState);
  }

  clear() {
    this.setState(INITIAL_STATE, this.saveState);
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
      <div className="Initiative">
      <Card>
        <CardHeader title={this.roundTitle()} subheader={this.roundTime()}/>
        <CardContent>
          <Hidden mdUp>
            <div className="Initiative-actions-medium">
              <Button variant="contained" size="small" color="primary" aria-label="Next" onClick={this.nextTurn}><IconSkipNext /></Button>
              <Button variant="contained" size="small" color="secondary" aria-label="Reset" onClick={this.reset}><IconRotateLeft /></Button>
              <Button variant="contained" size="small" color="secondary" aria-label="Clear" onClick={this.clear}><IconDeleteSweep /></Button>
            </div>
          </Hidden>
          <Hidden smDown>
            <div className="Initiative-actions-large">
              <Button variant="contained" color="primary" onClick={this.nextTurn}>Next &nbsp; <IconSkipNext /></Button>
              <Button variant="contained" color="secondary" onClick={this.reset}>Reset &nbsp; <IconRotateLeft /></Button>
              <Button variant="contained" color="secondary" onClick={this.clear}>Clear &nbsp; <IconDeleteSweep /></Button>
            </div>
          </Hidden>
          <List>
            {this.getListItems()}
          </List>
          <AddCharacterForm addCharacter={this.addCharacter} index={this.state.index}/>
        </CardContent>
      </Card>
      </div>
    );
  }
}

export default Initiative;
