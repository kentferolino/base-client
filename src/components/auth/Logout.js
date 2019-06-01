import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Proptypes from 'prop-types';
import { logout } from '../../actions/authActions';

class Logout extends PureComponent {
  static propTypes = {
    logoutAction: Proptypes.func.isRequired,
  };

  render() {
    const { logoutAction } = this.props;
    return (
      <Fragment>
        <Button onClick={logoutAction} href="#">
          Logout
        </Button>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { logoutAction: logout },
)(Logout);
