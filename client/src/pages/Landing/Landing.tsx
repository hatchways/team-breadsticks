import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './Styles/Landing';
import login from '../../helpers/APICalls/login';
// import LoginForm from './LoginForm/LoginForm';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import LandingFormSlide from './LandingFormSide';
import LandingImageSide from './LandingImageSide';

export default function Landing(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    { email, password }: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>,
  ) => {
    login(email, password).then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={7} md={6} component={Paper} square>
        <LandingFormSlide />
        {/* <Box className={classes.authWrapper}> */}
        {/* <AuthHeader linkTo="/signup" asideText="Don't have an account?" btnText="Create account" /> */}
        {/* <Box className={classes.logoWrapper}>
            <img src={`../../Images/logo.png`} alt={'logo'} />
          </Box>
          <Box width="100%" maxWidth={450} p={3} alignSelf="center">
            <Grid container>
              <Grid item xs>
                <Typography className={classes.welcome} component="h1" variant="h5">
                  Find the care your dog deserves
                </Typography>
              </Grid>
            </Grid> */}
        {/* <LoginForm handleSubmit={handleSubmit} /> */}
        {/* </Box>
          <Box p={1} alignSelf="center" />
        </Box> */}
      </Grid>
      <Grid item xs={12} sm={5} md={6} component={Paper} square>
        <LandingImageSide />
        {/* <Box className={classes.authWrapper}>
          <AuthHeader linkTo="/signup" asideText="Don't have an account?" btnText="Create account" />
          <Box width="100%" maxWidth={450} p={3} alignSelf="center">
            <Grid container>
              <Grid item xs>
                <Typography className={classes.welcome} component="h1" variant="h5">
                  Welcome back!
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box p={1} alignSelf="center" />
        </Box> */}
      </Grid>
    </Grid>
  );
}