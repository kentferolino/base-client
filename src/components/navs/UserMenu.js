import React, { Fragment, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authActions';

const UserMenu = ({ name, logoutAction }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <Fragment>
      <Button onClick={handleMenu}>
        {name}
        <AccountCircle />
      </Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        getContentAnchorEl={null}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem component={Link} to="/updateProfile" button>Profile</MenuItem>
        <MenuItem component={Link} to="/changepw" button>
          Change Password
        </MenuItem>
        <MenuItem onClick={logoutAction}>Logout</MenuItem>
      </Menu>
    </Fragment>
  );
};

UserMenu.propTypes = {
  name: PropTypes.string.isRequired,
  logoutAction: PropTypes.func.isRequired,
};

export default connect(
  null,
  { logoutAction: logout },
)(UserMenu);
