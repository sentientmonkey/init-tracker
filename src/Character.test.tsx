import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Character, { CharacterData } from "./Character";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Initiative from "./Initiative";

const character: CharacterData = {
  name: "Bilbo Baggins",
  roll: 18,
  index: 1,
  sortIndex: 0
};

const moveCharacter = jest.fn();
const removeCharacter = jest.fn();
const initiative = {} as Initiative;

let wrapper: ShallowWrapper;

beforeEach(() => {
  wrapper = shallow(
    <Character
      character={character}
      moveCharacter={moveCharacter}
      removeCharacter={removeCharacter}
      initiative={initiative}
    />
  );
});

it("renders a character details", () => {
  expect(wrapper.find(ListItem)).toHaveLength(1);

  const textProps = wrapper.find(ListItemText).props();
  expect(textProps.primary).toEqual("Bilbo Baggins");
  expect(textProps.secondary).toEqual(18);
});

it("handles a move up", () => {
  wrapper.find('[aria-label="Move Up"]').simulate("click");
  expect(moveCharacter).toBeCalledWith(1, undefined);
});

it("handles a delete", () => {
  wrapper.find('[aria-label="Delete"]').simulate("click");
  expect(moveCharacter).toBeCalledWith(1, undefined);
});
