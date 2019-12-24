import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Initiative from './Initiative';

export class CharacterData {
  index: number = 0;
  name: string = '';
  roll: number = 0;
  sortIndex: number = 0;
}

interface CharacterProps {
  character: CharacterData;
  initiative: Initiative;
  turn?: number;
  moveCharacter(initiative: number, value: any): void;
  removeCharacter(initiative: number, value: any): void;
}

const Character = ({
  character,
  initiative,
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
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              moveCharacter.call(initiative, character.index, event);
            }}>
            <ArrowUpwardIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            aria-label="Delete"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              removeCharacter.call(initiative, character.index, event);
            }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Character;
