import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Shopping from './pages/Shopping';
import Home from './pages/Home';
import Front from './components/Front';
import AppNavbar from './components/navs/AppNavbar';
import { addItem } from './actions/itemActions';

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

function PrivateRoute({ component: AuthComponent, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated ? (
          <AuthComponent {...props} {...rest} auth={auth} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  auth: PropTypes.shape({
    token: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    user: PropTypes.instanceOf(Object),
  }),
};

PrivateRoute.defaultProps = {
  auth: {
    token: null,
    isAuthenticated: null,
    isLoading: null,
    user: null,
  },
};

const Main = ({ auth, classes, addItemAction }) => {
  return (
    <Fragment>
      {auth.isLoading !== true && (
        <div className={classes.root}>
          <AppNavbar auth={auth} />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Route
              exact
              path="/"
              render={() => {
                return auth.isAuthenticated ? <Home auth={auth} /> : <Front />;
              }}
            />
            <PrivateRoute path="/home" component={Home} auth={auth} />
            <PrivateRoute
              path="/shop"
              component={Shopping}
              auth={auth}
              addItemAction={addItemAction}
            />
          </main>
        </div>
      )}
    </Fragment>
  );
};

Main.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  auth: PropTypes.shape({
    token: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    user: PropTypes.instanceOf(Object),
  }),
  addItemAction: PropTypes.func.isRequired,
};

Main.defaultProps = {
  auth: {
    token: null,
    isAuthenticated: null,
    isLoading: null,
    user: null,
  },
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { addItemAction: addItem },
)(withStyles(styles, { withTheme: true })(Main));
