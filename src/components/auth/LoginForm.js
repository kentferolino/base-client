import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  actionDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
}))

const LoginForm = ({ onChange, onSubmit }) => {

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
      <div className={classes.actionDiv}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={onSubmit}
        >
          Save
        </Button>
      </div>
    </>
  );
}

LoginForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
