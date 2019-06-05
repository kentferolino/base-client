import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const ItemForm = ({ action, toggle, item }) => {
  const [values, setValues] = useState(item);

  const onChange = event => {
    event.persist();
    setValues(vals => ({ ...vals, [event.target.name]: event.target.value }));
  };

  const onSubmit = e => {
    e.preventDefault();
    const newItem = values;
    action(newItem);
    toggle();
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
        value={values.name}
      />
      <DialogActions>
        <Button onClick={onSubmit}>Submit</Button>
      </DialogActions>
    </>
  );
};

ItemForm.propTypes = {
  action: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  item: PropTypes.shape({ _id: PropTypes.string, name: PropTypes.string }),
};

ItemForm.defaultProps = {
  item: { _id: null, name: null },
};

export default ItemForm;
