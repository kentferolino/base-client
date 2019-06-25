import React, { useState } from 'react';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import LoginForm from "./auth/LoginForm";
import { login } from '../actions/authActions';

const Front = ({ loginAction, error: { msg = {}, id: errorId = null, } }) => {
  const [loginFormValues, setFormValues] = useState({ email: '', password: '' });
  const { email, password } = loginFormValues;

  const onChange = e => {
    setFormValues({ ...loginFormValues, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault();

    // Create user object
    const user = {
      email,
      password,
    };

    // Attempt to register
    loginAction(user);
  };

  const errorMessage = errorId === 'LOGIN_FAIL' && msg ? msg.msg : null || null;

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>Please login. Username: kent@admin.com. Password: admin.</div>
        {errorMessage ? (
          <Typography color="secondary">{errorMessage}</Typography>
        ) : null}
        <LoginForm onChange={onChange} onSubmit={onSubmit} isModal={false} />
      </Container>
    </div>
  );
};

const mapStateToProps = state => ({
  error: state.error,
});

export default connect(
  mapStateToProps,
  {
    loginAction: login,
  },
)(Front);
