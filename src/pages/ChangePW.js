import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { changePassword } from '../actions/authActions';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '300px',
  },
}))

const ChangePW = ({ changePasswordAction, error }) => {

  const classes = useStyles();

  const [formValues, setFormValues] = useState({ currentPW: '', newPW: '', rNewPW: '' });
  const { currentPW, newPW, rNewPW } = formValues;

  const onChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault();

    // Create user object
    const passwordDetails = { currentPW, newPW, rNewPW };

    // Attempt to register
    changePasswordAction(passwordDetails);
  };

  return (
    <Box className={classes.root}>
      {error && error.msg && error.msg.msg && <Typography color="secondary">{error.msg.msg}</Typography>}
      <TextField
        autoFocus
        fullWidth
        label="Old Password"
        margin="normal"
        name="currentPW"
        placeholder="***"
        required
        type="password"
        value={currentPW}
        onChange={onChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        fullWidth
        name="newPW"
        label="New Password"
        margin="normal"
        placeholder="***"
        required
        type="password"
        value={newPW}
        onChange={onChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        fullWidth
        name="rNewPW"
        label="Repeat New Password"
        margin="normal"
        placeholder="***"
        required
        type="password"
        value={rNewPW}
        onChange={onChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={onSubmit}
      >
        Save
      </Button>
    </Box>
  );
};

const mapStateToProps = state => ({
  error: state.error,
});

export default connect(
  mapStateToProps,
  { changePasswordAction: changePassword },
)(ChangePW);
