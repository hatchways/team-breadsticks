import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
  paper: {
    margin: 'auto',
  },
  main: {
    background: 'primary',
    margin: ' 20vh auto',
    width: '60vw',
  },
  box: {
    height: '60vh',
    display: 'flex',
    flexDirection: 'column',
    padding: '5%',
  },
  title: {
    fontWeight: 700,
    textAlign: 'center',
    textTransform: 'capitalize',
    padding: 30,
  },
  avatar: {
    margin: '10px auto',
    width: 120,
    height: 120,
  },
  typography: {
    textAlign: 'center',
    color: 'primary',
  },
  input: {
    display: 'none',
  },
  button: {
    margin: 'auto',
  },
}));

export default useStyles;
