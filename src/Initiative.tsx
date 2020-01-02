import React, {useEffect, useReducer} from 'react';
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
import {InitiativeState, reducer} from './InitiativeReducer';

import './Initiative.css';

function Initiative() {
  const [state, dispatch] = useReducer(reducer, new InitiativeState());

  const {characters, round, turn, index} = state;

  const addCharacter = (c: CharacterData) =>
    dispatch({type: 'add', character: c});

  const moveCharacter = (index: number) =>
    dispatch({type: 'move', index: index});

  const removeCharacter = (index: number) =>
    dispatch({type: 'remove', index: index});

  const reset = () => dispatch({type: 'reset'});
  const next = () => dispatch({type: 'next'});
  const clear = () => dispatch({type: 'clear'});

  useEffect(() => {
    dispatch({type: 'load'});
  }, []);

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));
  }, [state]);

  const roundTitle = `Round ${round}`;

  const time = (round - 1) * 6;
  const roundMinutes = Math.floor(time / 60);
  const roundSeconds = (time % 60).toString().padStart(2, '0');

  const roundTime = `${roundMinutes}:${roundSeconds}`;

  const getListItems = () => {
    return characters.map((character, i) => (
      <Character
        character={character}
        moveCharacter={moveCharacter}
        removeCharacter={removeCharacter}
        turn={turn}
        key={i}
      />
    ));
  };

  return (
    <div className="Initiative">
      <Card>
        <CardHeader title={roundTitle} subheader={roundTime} />
        <CardContent>
          <Hidden mdUp>
            <div className="Initiative-actions-medium">
              <Button
                variant="contained"
                size="small"
                color="primary"
                aria-label="Next"
                onClick={next}>
                <IconSkipNext />
              </Button>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                aria-label="Reset"
                onClick={reset}>
                <IconRotateLeft />
              </Button>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                aria-label="Clear"
                onClick={clear}>
                <IconDeleteSweep />
              </Button>
            </div>
          </Hidden>
          <Hidden smDown>
            <div className="Initiative-actions-large">
              <Button variant="contained" color="primary" onClick={next}>
                Next &nbsp; <IconSkipNext />
              </Button>
              <Button variant="contained" color="secondary" onClick={reset}>
                Reset &nbsp; <IconRotateLeft />
              </Button>
              <Button variant="contained" color="secondary" onClick={clear}>
                Clear &nbsp; <IconDeleteSweep />
              </Button>
            </div>
          </Hidden>
          <List>{getListItems()}</List>
          <AddCharacterForm addCharacter={addCharacter} index={index} />
        </CardContent>
      </Card>
    </div>
  );
}

export default Initiative;
