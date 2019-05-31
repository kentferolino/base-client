import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

class ItemForm extends Component {
  static propTypes = {
    addItem: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired
  };

  state = {
    modal: false
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newItem = { name: this.state.name };
    this.props.addItem(newItem);
    this.props.toggle();
  };

  render() {
    return (
      <>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          name="name"
          id="item"
          onChange={this.onChange}
          fullWidth
        />
        <DialogActions>
          <Button onClick={this.onSubmit}>Add item</Button>
        </DialogActions>
      </>
    );
  }
}

export default ItemForm;
