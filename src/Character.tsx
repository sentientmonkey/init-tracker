import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

export class CharacterData {
  index: number = 0;
  name: string = '';
  roll: number = 0;
  sortIndex: number = 0;
}

interface CharacterProps {
  character: CharacterData;
  turn?: number;
  moveCharacter(initiative: number): void;
  removeCharacter(initiative: number): void;
}

const Character = ({
  character,
  turn,
  moveCharacter,
  removeCharacter,
}: CharacterProps) => {
  const selectedClass = character.index === turn ? 'Initiative-selected' : '';

  return (
    <ListItem key={character.index} className={selectedClass}>
      <ListItemText primary={character.name} secondary={character.roll} />
      <ListItemSecondaryAction>
        <Tooltip title="Move up">
          <IconButton
            aria-label="Move Up"
            onClick={() => {
              moveCharacter(character.index);
            }}>
            <ArrowUpwardIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            aria-label="Delete"
            onClick={() => {
              removeCharacter(character.index);
            }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Character;
