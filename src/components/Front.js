import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { login } from '../actions/authActions';
import LoginForm from "./auth/LoginForm";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '600px',
  },
  cardHeader: {
    borderBottom: 'solid 1px #cacaca',
  },
  cardContent: {
    padding: theme.spacing(0, 8),
  },
}));

const Front = ({ loginAction, error }) => {
  const { msg = {}, id: errorId = null, } = error;
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

  const classes = useStyles();

  return (
    <div>
      <Container component="main" className={classes.root}>
        <CssBaseline />
        <Card>
          <CardHeader title="Login" className={classes.cardHeader} />
          <CardContent className={classes.cardContent}>
            <div style={{ color: 'red' }}>Please login. Username: kent@admin.com. Password: admin.</div>
            {errorMessage ? (
              <Typography color="secondary">{errorMessage}</Typography>
            ) : null}
            <LoginForm onChange={onChange} onSubmit={onSubmit} isModal={false} />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

Front.propTypes = {
  loginAction: PropTypes.func.isRequired,
  error: PropTypes.shape({
    msg: PropTypes.instanceOf(Object).isRequired,
    errorId: PropTypes.string,
  }).isRequired
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
