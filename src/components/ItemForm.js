import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

class ItemForm extends Component {
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
    this.toggle();
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
