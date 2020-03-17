import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AccountCircle from '@material-ui/icons/AccountCircleRounded';

import { makeStyles } from '@material-ui/core/styles';

import style from './style';

import UserInfo from '../UserInfo';

const Navbar = props => {
  const { user, logout } = props;

  const classes = makeStyles(style)();

  const [anchorElement, setAnchorElement] = React.useState(null);
  const [openProfile, setProfileState] = React.useState(false);
  const openMenu = Boolean(anchorElement);

  const handleOpenMenu = event => {
    setAnchorElement(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElement(null);
  };

  const handleOpenProfile = () => {
    setProfileState(true);
  };

  const handleCloseProfile = () => {
    setProfileState(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Kudos App
          </Typography>
          <>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenMenu}
              color="inherit"
            >
              <AccountCircle fontSize="large" className={classes.iconButton} />
              <Typography variant="subtitle2">{user.firstName}</Typography>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElement}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              keepMounted
              open={openMenu}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleOpenProfile}>Profile</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </>
        </Toolbar>
      </AppBar>
      <Dialog
        onClose={handleCloseProfile}
        aria-labelledby="user-profile-popup"
        open={openProfile}
        maxWidth="sm"
        fullWidth
      >
        <UserInfo user={user} logout={logout} />
      </Dialog>
    </>
  );
};

export default Navbar;
