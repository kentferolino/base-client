import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const LoginForm = ({ onChange, onSubmit, toggle, isModal = false }) => {

  const classes = useStyles();

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
      {
        isModal && (
          <Button
            onClick={toggle}
            className={classes.submit}
            modal={isModal}
          >
            Cancel
          </Button>
        )
      }
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
