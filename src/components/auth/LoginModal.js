import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class LoginModal extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.shape({
      msg: PropTypes.shape({ msg: PropTypes.string }),
      status: PropTypes.number,
      id: PropTypes.string,
    }),
    loginAction: PropTypes.func.isRequired,
    clearErrorsAction: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isAuthenticated: false,
    error: {
      msg: {},
      status: null,
      id: null,
    },
  };

  state = {
    modal: false,
    email: '',
    password: '',
  };

  componentDidUpdate() {
    const { modal } = this.state;
    const { isAuthenticated } = this.props;

    // Close modal after being authenticated.
    if (modal && isAuthenticated) {
      this.toggle();
    }
  }

  toggle = () => {
    const { clearErrorsAction } = this.props;
    clearErrorsAction();
    const { modal } = this.state;
    this.setState({ modal: !modal });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const { loginAction } = this.props;

    // Create user object
    const user = {
      email,
      password,
    };

    // Attempt to register
    loginAction(user);
  };

  render() {
    const { modal } = this.state;
    const { error } = this.props;
    const { id: errorId } = error || null;
    const errorMessage = errorId === 'LOGIN_FAIL' && error ? error.msg.msg : null || null;
    return (
      <div>
        <Button onClick={this.toggle} href="#">
          Login
        </Button>
        <Dialog open={modal} onClose={this.toggle}>
          <DialogTitle onClose={this.toggle} id="login-dialog-title">
            Login
          </DialogTitle>
          <DialogContent>
            {errorMessage ? (
              <DialogContentText id="alert-dialog-description" color="secondary">
                {errorMessage}
              </DialogContentText>
            ) : null}
            <TextField
              autoFocus
              margin="dense"
              label="Email Address"
              type="email"
              name="email"
              id="email"
              onChange={this.onChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              name="password"
              id="password"
              onChange={this.onChange}
              fullWidth
            />
            <DialogActions>
              <Button onClick={this.toggle}>Cancel</Button>
              <Button onClick={this.onSubmit} color="primary" variant="outlined">
                Login
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

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
