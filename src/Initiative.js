import React, { Component } from 'react';
import AddCharacterForm from './AddCharacterForm.js';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import './Initiative.css';

class Initiative extends Component {
  constructor(props) {
    super(props);
    this.state = {characters: [], round: 1, turn: null};

    this.addCharacter = this.addCharacter.bind(this);
    this.nextTurn = this.nextTurn.bind(this);
  }

  addCharacter(character) {
    let characters = this.state.characters
        .concat(character)
        .sort((a,b) => b.roll - a.roll);
    this.setState({characters: characters});
  }

  removeCharacter(index, event) {
    event.preventDefault();
    if (this.state.turn && this.state.turn.index === index) {
      this.nextTurn();
    }
    let characters = this.state.characters
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
    <ListItem key={character.index} className={character === turn ? "Initiative-selected" : ""}>
      <ListItemText primary={character.name} secondary={character.roll} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete" onClick={this.removeCharacter.bind(this,character.index)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
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
