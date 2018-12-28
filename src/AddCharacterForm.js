import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import './AddCharacterForm.css';

class AddCharacterForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let name = this.name.value;
    let roll = parseInt(this.roll.value, 10);
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
      sortIndex: 0,
    };
    this.props.addCharacter(character);
    this.name.value = "";
    this.roll.value = "";
    this.name.focus();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="AddCharacterForm">
        <Input className="AddCharacterForm-input" aria-label="Name" autoFocus={true} placeholder="Name" type="text" inputRef={el => this.name = el}/>
        <Input className="AddCharacterForm-input" aria-label="Roll" placeholder="Roll" type="number" inputRef={el => this.roll = el} />
        <Button color="primary" mini variant="fab" aria-label="add" type="submit">
          <AddIcon />
        </Button>
      </form>
    );
  }
}

export default AddCharacterForm;
