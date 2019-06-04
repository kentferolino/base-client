import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const ItemForm = props => {
  const [values, setValues] = useState({});

  const onChange = event => {
    event.persist();
    setValues(vals => ({ ...vals, [event.target.name]: event.target.value }));
  };

  const onSubmit = e => {
    e.preventDefault();
    const newItem = values;
    props.addItem(newItem);
    props.toggle();
  };

  return (
    <>
      <TextField
        autoFocus
        margin="dense"
        label="Name"
        type="text"
        name="name"
        id="item"
        onChange={onChange}
        fullWidth
      />
      <DialogActions>
        <Button onClick={onSubmit}>Add item</Button>
      </DialogActions>
    </>
  );
};

ItemForm.propTypes = {
  addItem: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default ItemForm;
