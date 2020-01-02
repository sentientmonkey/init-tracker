import {CharacterData} from './Character';

export class InitiativeState {
  characters: Array<CharacterData> = [];
  round: number = 1;
  turn: number = 0;
  index: number = 1;
}

const initialState = new InitiativeState();

const byIndexAndRoll = (a: CharacterData, b: CharacterData) => {
  const rollDiff = b.roll - a.roll;
  if (rollDiff !== 0) {
    return rollDiff;
  }

  return b.sortIndex - a.sortIndex;
};

const updateSortIndex = (c: CharacterData, index: number) => {
  if (c.index === index) {
    c.sortIndex += 1;
    return c;
  } else {
    return c;
  }
};

type AddCharacterAction = {
  type: 'add';
  character: CharacterData;
};

type MoveCharacterAction = {
  type: 'move';
  index: number;
};

type RemoveCharacterAction = {
  type: 'remove';
  index: number;
};

type ClearAction = {
  type: 'clear';
};

type ResetAction = {
  type: 'reset';
};

type NextTurnAction = {
  type: 'next';
};

type LoadAction = {
  type: 'load';
};

type CharacterAction =
  | AddCharacterAction
  | MoveCharacterAction
  | RemoveCharacterAction
  | ClearAction
  | ResetAction
  | NextTurnAction
  | LoadAction;

export const reducer = (
  state: InitiativeState,
  action: CharacterAction,
): InitiativeState => {
  let characters: CharacterData[];
  let index: number;
  let round: number;
  let turn: number;

  switch (action.type) {
    case 'add':
      characters = state.characters
        .concat(action.character)
        .sort(byIndexAndRoll);
      index = state.index + 1;
      return {...state, index, characters};
    case 'move':
      characters = state.characters
        .map(c => updateSortIndex(c, action.index))
        .sort(byIndexAndRoll);
      return {...state, characters};
    case 'remove':
      characters = state.characters.filter(c => c.index !== action.index);
      return {...state, characters};
    case 'clear':
      characters = [];
      turn = initialState.turn;
      round = initialState.round;
      return {...state, characters, turn, round};
    case 'reset':
      turn = initialState.turn;
      round = initialState.round;
      return {...state, turn, round};
    case 'next':
      turn = (state.turn % state.characters.length) + 1;
      round = turn === state.characters.length ? state.round + 1 : state.round;
      return {...state, turn, round};
    case 'load':
      const storageState = localStorage.getItem('state');
      if (storageState !== null) {
        return JSON.parse(storageState);
      }
      return state;
    default:
      throw Error('Unknown type!');
  }
};
