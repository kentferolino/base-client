import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import LoginForm from './LoginForm';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(1)
  },
  paper: {
    marginTop: theme.spacing(8),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))


const LoginModal = ({
  isAuthenticated = false,
  error: { msg = {}, id: errorId = null, },
  clearErrorsAction,
  loginAction
}) => {
  const [modal, setModal] = useState(false);
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
  const toggle = () => {
    clearErrorsAction();
    setModal(!modal);
  };

  const classes = useStyles();
  const errorMessage = errorId === 'LOGIN_FAIL' && msg ? msg.msg : null || null;

  useEffect(() => {
    if (modal && isAuthenticated) {
      toggle();
    }
  }, [modal])

  return (
    <div>
      <Button onClick={toggle} href="#">
        Login
      </Button>
      <Dialog open={modal} onClose={toggle}>
        <DialogTitle onClose={toggle} id="login-dialog-title">
          Login
        </DialogTitle>
        <DialogContent>
          {errorMessage ? (
            <DialogContentText id="alert-dialog-description" color="secondary">
              {errorMessage}
            </DialogContentText>
          ) : null}
          <LoginForm classes={classes} onChange={onChange} onSubmit={onSubmit} toggle={toggle} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

LoginModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.shape({
    msg: PropTypes.shape({ msg: PropTypes.string }),
    id: PropTypes.string,
  }),
  loginAction: PropTypes.func.isRequired,
  clearErrorsAction: PropTypes.func.isRequired,
}

LoginModal.defaultProps = {
  isAuthenticated: false,
  error: {
    msg: {},
    id: null,
  },
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(
  mapStateToProps,
  {
    loginAction: login,
    clearErrorsAction: clearErrors,
  },
)(LoginModal);
