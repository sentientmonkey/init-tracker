import React from 'react';
import {CommonWrapper, mount, ReactWrapper, ShallowWrapper} from 'enzyme';
import AddCharacterForm from './AddCharacterForm';
import {CharacterData} from './Character';

var wrapper: ReactWrapper;
var addCharacter = jasmine.createSpy('addCharacter');

interface IPreventDefault {
  preventDefault(): void;
}

var event: IPreventDefault;

const startingIndex = 10;

const character: CharacterData = {
  name: 'Samwise Gamgee',
  roll: 2,
  index: 10,
  sortIndex: 0,
};

describe('AddCharacterForm', function() {
  beforeEach(function() {
    addCharacter = jasmine.createSpy('addCharacter');
    wrapper = mount(
      <AddCharacterForm addCharacter={addCharacter} index={startingIndex} />,
    );
    event = {
      preventDefault: jasmine.createSpy(),
    } as IPreventDefault;
  });

  it('renders a form', function() {
    expect(wrapper.find('form').length).toEqual(1);
  });

  it('adds a character when submitted', function() {
    var focus = jasmine.createSpy();
    var subject = wrapper.instance() as AddCharacterForm;

    subject.name!.value = 'Samwise Gamgee';
    subject.name!.focus = focus;
    subject.roll!.value = '2';
    wrapper
      .find('form')
      .get(0)
      .props.onSubmit(event);

    expect(subject.props.index).toEqual(startingIndex);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(addCharacter).toHaveBeenCalledWith(character);
    expect(subject.name!.value).toEqual('');
    expect(subject.roll!.value).toEqual('');
    expect(focus).toHaveBeenCalled();
  });

  it('does not submit when name is blank', function() {
    var subject = wrapper.instance() as AddCharacterForm;

    subject.name!.value = '';
    subject.roll!.value = '2';
    wrapper
      .find('form')
      .get(0)
      .props.onSubmit(event);

    expect(subject.props.index).toEqual(startingIndex);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(addCharacter).toHaveBeenCalledTimes(0);
  });

  it('does not submit when roll is not a number', function() {
    var subject = wrapper.instance() as AddCharacterForm;

    subject.name!.value = 'Bad Sam';
    subject.roll!.value = 'asdf';
    wrapper
      .find('form')
      .get(0)
      .props.onSubmit(event);

    expect(subject.props.index).toEqual(startingIndex);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(addCharacter).toHaveBeenCalledTimes(0);
  });
});
