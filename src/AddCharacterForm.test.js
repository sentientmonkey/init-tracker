import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import AddCharacterForm from './AddCharacterForm';

var wrapper;
var addCharacter;
var event;

const character = {
  name: 'Samwise Gamgee',
  roll: 2,
  index: 1,
  sortIndex: 0,
};

beforeEach(() => {
  addCharacter = jest.fn();
  wrapper = mount(<AddCharacterForm
    addCharacter={addCharacter}
    />);
  event = {preventDefault: jest.fn()};
});


it('renders a form', () => {
  expect(wrapper.find('form')).toHaveLength(1);
});

it('adds a character when submitted', () => {
  var focus = jest.fn();

  wrapper.instance().name = {value: "Samwise Gamgee", focus: focus};
  wrapper.instance().roll = {value: "2"};
  wrapper.find('form').get(0).props.onSubmit(event);

  expect(wrapper.instance().state.index).toEqual(1);
  expect(event.preventDefault).toHaveBeenCalled();
  expect(addCharacter).toBeCalledWith(character);
  expect(wrapper.instance().name.value).toEqual("");
  expect(wrapper.instance().roll.value).toEqual("");
  expect(focus).toHaveBeenCalled();
});

it('does not submit when name is blank', () => {
  wrapper.instance().name = {value: ""};
  wrapper.instance().roll = {value: "2"};
  wrapper.find('form').get(0).props.onSubmit(event);

  expect(wrapper.instance().state.index).toEqual(0);
  expect(event.preventDefault).toHaveBeenCalled();
  expect(addCharacter).toHaveBeenCalledTimes(0);
});

it('does not submit when roll is not a number', () => {
  wrapper.instance().name = {value: "Bad Sam"};
  wrapper.instance().roll = {value: "asdf"};
  wrapper.find('form').get(0).props.onSubmit(event);

  expect(wrapper.instance().state.index).toEqual(0);
  expect(event.preventDefault).toHaveBeenCalled();
  expect(addCharacter).toHaveBeenCalledTimes(0);
});