import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';
import { Typography } from '@material-ui/core';
import Logo from '../../Images/logo.png';
import AuthMenu from '../AuthMenu/AuthMenu';

interface Props {
  linkTo?: string;
  asideText: string;
  btnText?: string;
}

const AuthHeader = ({ asideText }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={classes.authHeader}>
      <Link to="/">
        <img src={Logo} alt="logo" />
      </Link>
      <Box p={1} className={classes.authMenus}>
        <Typography className={classes.accAside}>{asideText}</Typography>
        <Button
          component={Link}
          to="/login"
          className={`${classes.headerBtn} ${classes.loginBtn}`}
          color="primary"
          variant="outlined"
        >
          Login
        </Button>
        <Button
          component={Link}
          to="/signup"
          className={`${classes.headerBtn} ${classes.signupBtn}`}
          color="primary"
          variant="contained"
        >
          Sign Up
        </Button>
      </Box>
      <AuthMenu />
    </Box>
  );
};

export default AuthHeader;
