import React, { Component, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Shopping from './Shopping';
import Home from './Home';
import Front from './Front';
import AppNavbar from './navs/AppNavbar';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

function PrivateRoute({ component: Component, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

class Main extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    classes: PropTypes.object,
  };

  render() {
    const { auth, classes } = this.props;
    return (
      <Fragment>
        {auth.isLoading !== true && (
          <div className={classes.root}>
            <AppNavbar isAuthenticated={auth.isAuthenticated} />
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Route
                exact
                path="/"
                render={props => {
                  return auth.isAuthenticated ? <Home auth={auth} /> : <Front />;
                }}
              />
              <PrivateRoute path="/home" component={Home} auth={auth} />
              <PrivateRoute path="/shop" component={Shopping} auth={auth} />
            </main>
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles, { withTheme: true })(Main));
