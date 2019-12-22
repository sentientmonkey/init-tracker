import React, { Component } from "react";
import AddIcon from "@material-ui/icons/Add";
import Input from "@material-ui/core/Input";
import Fab from "@material-ui/core/Fab";
import "./AddCharacterForm.css";

interface AddCharacterProps {
  index: number;
  addCharacter(character: object): void;
}

class AddCharacterForm extends Component<AddCharacterProps, {}> {
  name?: HTMLInputElement;
  roll?: HTMLInputElement;

  constructor(props: AddCharacterProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    let name = (this.name && this.name.value) || "";
    let roll = parseInt((this.roll && this.roll.value) || "", 10);
    if (name === "") {
      return;
    }

    if (isNaN(roll)) {
      return;
    }

    const character = {
      name: name,
      roll: roll,
      index: this.props.index,
      sortIndex: 0
    };
    this.props.addCharacter(character);
    if (this.name) {
      this.name.value = "";
      this.name.focus();
    }
    if (this.roll) {
      this.roll.value = "";
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="AddCharacterForm">
        <Input
          className="AddCharacterForm-input"
          aria-label="Name"
          autoFocus={true}
          placeholder="Name"
          type="text"
          inputRef={el => (this.name = el)}
        />
        <Input
          className="AddCharacterForm-input"
          aria-label="Roll"
          placeholder="Roll"
          type="number"
          inputRef={el => (this.roll = el)}
        />
        <Fab color="primary" size="small" aria-label="add" type="submit">
          <AddIcon />
        </Fab>
      </form>
    );
  }
}

export default AddCharacterForm;
