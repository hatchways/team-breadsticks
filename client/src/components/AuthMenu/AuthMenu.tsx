/* eslint-disable prettier/prettier */ import { useState, MouseEvent } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useAuth } from '../../context/useAuthContext';
import useStyles from './useStyles';
import DemoUserLogin from '../DemoUserLogin/DemoUserLogin';
import AvatarDisplay from '../AvatarDisplay/AvatarDisplay';

type LinkType = '/login' | '/signup' | '/my-jobs' | '/my-sitters' | '/profile' | '/messages' | '/listings';

const AuthMenu = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { loggedInUser, logout } = useAuth();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  const handleMenu = (linkTo: LinkType) => {
    handleClose();
    history.push(linkTo);
  };

  return (
    <Box className={`${classes.authMobileMenus} ${loggedInUser && classes.displayAuthMenus}`}>
      <IconButton aria-label="show auth menu" aria-controls="auth-menu" aria-haspopup="true" onClick={handleClick}>
        {location.pathname === '/login' || location.pathname === '/signup' ? (
          <MoreHorizIcon />
        ) : (
          <AvatarDisplay loggedIn user={loggedInUser} />
        )}
      </IconButton>
      <Menu
        id="auth-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        getContentAnchorEl={null}
      >
        {loggedInUser ? (
          <Box>
            <MenuItem
              className={`${classes.menuItem} ${classes.menuItemDesktop}`}
              onClick={() => handleMenu('/listings')}
            >
              Listings
            </MenuItem>
            {loggedInUser.isSitter ? (
              <MenuItem
                className={`${classes.menuItem} ${classes.menuItemDesktop}`}
                onClick={() => handleMenu('/my-jobs')}
              >
                My Jobs
              </MenuItem>
            ) : (
              <MenuItem
                className={`${classes.menuItem} ${classes.menuItemDesktop}`}
                onClick={() => handleMenu('/my-sitters')}
              >
                My Sitters
              </MenuItem>
            )}
            <MenuItem
              className={`${classes.menuItem} ${classes.menuItemDesktop}`}
              onClick={() => handleMenu('/messages')}
            >
              Messages
            </MenuItem>
            <MenuItem className={classes.menuItem} onClick={() => handleMenu('/profile')}>
              Profile
            </MenuItem>
            <MenuItem className={classes.menuItem} onClick={handleLogout}>
              Logout
            </MenuItem>
          </Box>
        ) : (
          <Box>
            <DemoUserLogin isMenuItem classes={classes.menuItem} />
            <MenuItem className={classes.menuItem} onClick={() => handleMenu('/login')}>
              Login
            </MenuItem>
            <MenuItem className={classes.menuItem} onClick={() => handleMenu('/signup')}>
              Sign Up
            </MenuItem>
          </Box>
        )}
      </Menu>
    </Box>
  );
};

export default AuthMenu;
