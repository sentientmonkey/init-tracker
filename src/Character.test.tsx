import React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import Character, {CharacterData} from './Character';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Initiative from './Initiative';

const character: CharacterData = {
  name: 'Bilbo Baggins',
  roll: 18,
  index: 1,
  sortIndex: 0,
};

let moveCharacter: jasmine.Spy;
let removeCharacter: jasmine.Spy;
const initiative = {} as Initiative;

let wrapper: ShallowWrapper;

describe('Character', function() {
  beforeEach(() => {
    moveCharacter = jasmine.createSpy('moveCharacter');
    removeCharacter = jasmine.createSpy('removeCharacter');

    wrapper = shallow(
      <Character
        character={character}
        moveCharacter={moveCharacter}
        removeCharacter={removeCharacter}
        initiative={initiative}
      />,
    );
  });

  it('renders a character details', function() {
    expect(wrapper.find(ListItem).length).toEqual(1);

    const textProps = wrapper.find(ListItemText).props();
    expect(textProps.primary).toEqual('Bilbo Baggins');
    expect(textProps.secondary).toEqual(18);
  });

  it('handles a move up', function() {
    wrapper.find('[aria-label="Move Up"]').simulate('click');
    expect(moveCharacter).toHaveBeenCalledWith(1, undefined);
  });

  it('handles a delete', function() {
    wrapper.find('[aria-label="Delete"]').simulate('click');
    expect(removeCharacter).toHaveBeenCalledWith(1, undefined);
  });
});
