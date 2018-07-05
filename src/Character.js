import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

class Character extends Component {
  render() {
    const character = this.props.character;
    const initiative = this.props.initiative;
    const selectedClass = character === this.props.turn ? "Initiative-selected" : "";

    return (
    <ListItem key={character.index} className={selectedClass}>
      <ListItemText primary={character.name} secondary={character.roll} />
      <ListItemSecondaryAction>
        <Tooltip title="Move up">
          <IconButton aria-label="Move Up"
            onClick={this.props.moveCharacter.bind(initiative,character.index)}>
            <ArrowUpwardIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton aria-label="Delete"
            onClick={this.props.removeCharacter.bind(initiative,character.index)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
    );
  }
}

export default Character;

