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
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.shape({
      msg: PropTypes.shape({ msg: PropTypes.string }),
      status: PropTypes.number,
      id: PropTypes.string,
    }),
    registerAction: PropTypes.func.isRequired,
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

  componentDidUpdate() {
    const { modal } = this.state;
    const { isAuthenticated } = this.props;

    // Close modal after being authenticated.
    if (modal && isAuthenticated) {
      this.toggle();
    }
  }

  toggle = () => {
    const { modal } = this.state;
    const { clearErrorsAction } = this.props;
    clearErrorsAction();
    this.setState({ modal: !modal });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password } = this.state;
    const { registerAction } = this.props;

    // Create user object
    const newUser = {
      name,
      email,
      password,
    };

    // Attempt to register
    registerAction(newUser);
  };

  render() {
    const { modal } = this.state;
    const { error } = this.props;
    const { id: errorId } = error || null;
    const errorMessage = errorId === 'REGISTER_FAIL' && error ? error.msg.msg : null || null;

    return (
      <div>
        <Button onClick={this.toggle} href="#">
          Register
        </Button>
        <Dialog open={modal} onClose={this.toggle} aria-labelledby="register-dialog-title">
          <DialogTitle onClose={this.toggle} id="register-dialog-title">
            Register
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
              label="Name"
              type="text"
              name="name"
              id="name"
              onChange={this.onChange}
              fullWidth
            />
            <TextField
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
                Register
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
    registerAction: register,
    clearErrorsAction: clearErrors,
  },
)(RegisterModal);
