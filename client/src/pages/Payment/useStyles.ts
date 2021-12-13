/* eslint-disable prettier/prettier */
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },

  h6: {
    fontWeight: 'bold',
  },

  containerInfo: {
    color: 'rgb(198, 196, 196)',
    padding: '20px 0',
  },
  container: {
    padding: 0,
  },

  cardContainer: {
    paddingTop: '40px',
    minHeight: '70vh',
    margin: '0 auto',
  },
  card: {
    padding: '7% 0',
  },
  gridContainer: {
    marginTop: '50px',
    margin: '0 auto',
  },
  addProfileBtn: {
    marginTop: '40px',
    color: '#f04040',
    border: '1px solid #f04040',
    marginRight: 10,
  },
  checkBox: {
    color: '#f04040',
    borderRadius: '50%',
    marginTop: '-19px',
    marginRight: '-11px',
  },
  grid: {
    minHeight: '40vh',
    width: 700,
  },

  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: '24',
    p: '4',
  },
  payCard: {
    width: '20rem',
    height: '12rem',
  },
  cardNumberContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    fontSize: '0.1rem',
    alignItems: 'center',
    maxWidth: '60%',
  },

  cardNumber: {
    whiteSpace: 'nowrap',
  },
  cardDateContainer: {
    marginTop: '5px',
    fontWeight: 'bolder',
  },

  cardDate: {
    fontSize: '0.8rem',
    fontWeight: 'bolder',
    color: '#969696',
  },

  cardHeader: {
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    height: 38,
  },

  cardFooter: {
    padding: '16px',
    paddingTop: '0',
  },
  formContainer: {
    width: '10rem',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'column',
  },
  field: {
    margin: '5px',
  },
  cardElementContainer: {
    width: '97%',
    padding: '8px 4px',

    marginLeft: '5px',
    marginTop: '1%',
    border: '1px solid #c4c4c4',
    borderRadius: '5px',
  },
  dialogTitle: {
    textAlign: 'center',
    fontWeight: 'bolder',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },

  submitButton: {
    margin: theme.spacing(3, 2, 2),
    padding: 5,
    width: 160,
    borderRadius: theme.shape.borderRadius,
    marginTop: 49,
    fontSize: 16,
    backgroundColor: '#3a8dff',
    fontWeight: 'bold',
  },
  cancelButton: {
    margin: theme.spacing(3, 2, 2),
    padding: 5,
    width: 160,
    borderRadius: theme.shape.borderRadius,
    marginTop: 49,
    fontSize: 16,
    fontWeight: 'bold',
  },

  dialog: {
    position: 'relative',
    paddingBottom: '2rem',
    paddingRight: '9%',
  },
}));

export default useStyles;
