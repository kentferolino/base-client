import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import RegisterModal from '../auth/RegisterModal';
import Logout from '../auth/Logout';
import LoginModal from '../auth/LoginModal';

class Navbar extends PureComponent {
  static propTypes = {
    doDrawerOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    classes: PropTypes.instanceOf(Object).isRequired,
    auth: PropTypes.shape({
      token: PropTypes.string,
      isAuthenticated: PropTypes.bool,
      isLoading: PropTypes.bool,
      user: PropTypes.instanceOf(Object),
    }),
  };

  static defaultProps = {
    auth: {
      token: null,
      isAuthenticated: null,
      isLoading: null,
      user: null,
    },
  };

  render() {
    const { classes, open, doDrawerOpen, auth } = this.props;
    const { isAuthenticated = false, user = null } = auth;

    const authLinks = (
      <Fragment>
        <span className="navbar-text mr-3">
          <strong>{user ? `Welcome ${user.name}` : ''}</strong>
        </span>
        <Logout />
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <RegisterModal />
        <LoginModal />
      </Fragment>
    );

    return (
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar disableGutters={!open}>
          {isAuthenticated && (
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={doDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {isAuthenticated ? <Link to="/shop">Shopping List</Link> : <Link to="/">Shopping</Link>}
          </Typography>
          {isAuthenticated ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  null,
)(Navbar);
