import { Box } from '@material-ui/core';
import { User } from '../../interface/User';
import { useAuth } from '../../context/useAuthContext';
import useStyles from './useStyles';
import AuthNavItem from '../AuthNavItem/AuthNavItem';
import NotificationButton from '../Notification/NotificationButton';
interface Props {
  loggedInUser?: User;
  linkTo: string;
  asideText: string;
  btnText?: string;
  notifCount: number;
}

const AuthMenuDesktop = ({ asideText, linkTo, notifCount }: Props): JSX.Element => {
  const classes = useStyles();
  const { loggedInUser } = useAuth();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" className={classes.authMenuDesktop}>
      <AuthNavItem asideText={asideText} classes={`${classes.accAside} ${classes.authNavMobile}`} linkTo={linkTo} />
      {loggedInUser ? (
        <>
          <NotificationButton notifCount={notifCount} />
          {loggedInUser.isSitter ? (
            <AuthNavItem
              isButton
              classes={`${classes.authNavItemBtn} ${classes.authNavMobile}`}
              linkTo="/my-jobs"
              btnText="My Jobs"
              variant="text"
            />
          ) : (
            <AuthNavItem
              isButton
              classes={`${classes.authNavItemBtn} ${classes.authNavMobile}`}
              linkTo="/my-sitters"
              btnText="My Sitters"
              variant="text"
            />
          )}
          <AuthNavItem
            isButton
            classes={`${classes.authNavItemBtn} ${classes.authNavMobile}`}
            linkTo="/listings"
            btnText="Listings"
            variant="text"
          />
          <AuthNavItem
            isButton
            classes={`${classes.authNavItemBtn} ${classes.authNavMobile}`}
            linkTo="/messages"
            btnText="Messages"
            variant="text"
          />
          <AuthNavItem
            isButton
            classes={`${classes.headerBtn} ${classes.loginBtn}`}
            linkTo="/payment"
            btnText="Payment"
            variant="outlined"
          />
        </>
      ) : (
        <>
          <AuthNavItem
            isButton
            classes={`${classes.headerBtn} ${classes.loginBtn}`}
            linkTo="/login"
            btnText="Login"
            variant="outlined"
          />
          <AuthNavItem
            isButton
            classes={`${classes.headerBtn} ${classes.signupBtn}`}
            linkTo="/signup"
            btnText="Sign Up"
            variant="contained"
          />
        </>
      )}
    </Box>
  );
};

export default AuthMenuDesktop;
