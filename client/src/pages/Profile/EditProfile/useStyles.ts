import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  editProfileContainer: {
    margin: 'auto',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      margin: theme.spacing(0),
    },
  },
  form: {
    width: '100%',
    padding: '0 40px',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  typography: {
    margin: 20,
    fontWeight: 700,
  },
  title: {
    fontWeight: 700,
    textAlign: 'center',
    padding: '5px',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  label: {
    padding: 10,
    margin: 10,
    fontWeight: 700,
    width: 150,
    display: 'inline-block',
    textAlign: 'right',
    textTransform: 'uppercase',
  },
  textField: {
    width: '60%',
  },
  box: {
    padding: 2.5,
    [theme.breakpoints.down('xs')]: {
      width: '95%',
    },
  },
  boxStyle: {
    display: 'inline-flex',
    width: '60%',
    justifyContent: 'space-between',
  },
  main: {
    padding: '40px',
    minHeight: '100vh',
    background: 'primary',
    margin: 'auto',
  },
  button: {
    width: 120,
    height: 40,
    margin: '20px auto',
    alignSelf: 'center',
    display: 'block',
    textTransform: 'uppercase',
  },
  grid: {
    margin: 'auto',
  },
  select: {
    width: '150%',
  },
  phone: {
    display: 'inline-block',
    fontStyle: 'italic',
  },
}));

export default useStyles;
