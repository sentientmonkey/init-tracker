import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import './AddCharacterForm.css';

class AddCharacterForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {index: 0};
  }

  handleSubmit(event) {
    event.preventDefault();
    let name = this.name.value;
    let roll = this.roll.value;
    if (name === "") {
      return;
    }

    let index = this.state.index+1;
    this.setState({index: index});
    const character = {
      name: name,
      roll: roll,
      index: index,
    };
    this.props.addCharacter(character);
    this.name.value = "";
    this.roll.value = "";
    this.name.focus();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} classNames="AddCharacterForm">
        <Input className="AddCharacterForm-input" autoFocus={true} placeholder="Name" type="text" inputRef={el => this.name = el} />
        <Input className="AddCharacterForm-input" placeholder="Roll" type="number" inputRef={el => this.roll = el} />
        <Button color="primary" type="submit" primary={true}>
          Add
        </Button>
      </form>
    );
  }
}

export default AddCharacterForm;
