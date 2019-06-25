import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const LoginForm = ({ classes, onChange, onSubmit, toggle, }) => {

  return (
    <>
      <TextField
        autoFocus
        margin="dense"
        label="Email Address"
        type="email"
        name="email"
        id="email"
        onChange={onChange}
        fullWidth
      />
      <TextField
        margin="dense"
        label="Password"
        type="password"
        name="password"
        id="password"
        onChange={onChange}
        fullWidth
      />
      <Button
        onClick={toggle}
        className={classes.submit}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={onSubmit}
      >
        Save
      </Button>
    </>
  );
}

export default LoginForm;
