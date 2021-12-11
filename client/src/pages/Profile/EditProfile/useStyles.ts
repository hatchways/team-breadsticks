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
  // label: {
  //   padding: 10,
  //   margin: 10,
  //   fontWeight: 700,
  //   width: 150,
  //   display: 'inline-block',
  //   textAlign: 'right',
  //   textTransform: 'uppercase',
  // },
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

  container: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#d7d7d74a',
    // height:'150vh',
  },

  editProfilesContainer: {
    [theme.breakpoints.down('xs')]: {
      padding: '1rem',
      marginTop: '3rem',
    },
  },
  formContainer: {
    textAlign: 'right',
    // display: 'flex',
    // flexFlow: 'column',
    // justifyContent: 'center',
    width: '70%',
    [theme.breakpoints.down('md')]: {
      width: '80%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      // margin: '5rem',
    },
    marginBottom: '5rem',
    // backgroundColor:'green',
    padding: '1% 9%',
    paddingBottom: '4rem',
  },

  fieldContainer: {
    // width: '80%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: '20px 0',
    marginRight: '20px',
    // maxWidth: '514px',
  },

  inputContainer: {
    width: '80%',
    textAlign: 'left',
    display: 'flex',
    paddingLeft: '10px',
    // marginLeft:'10px',
  },
  inputphoneNumberContainer: {
    width: '80%',
    textAlign: 'left',
    paddingLeft: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: '0.6rem',
    whiteSpace: 'nowrap',
    fontWeight: 'bolder',
  },
  field: {
    // marginLeft: '10px',
    // height:'3rem',
    // & Mui-focused fieldset': {
    //             borderColor: 'yellow',
    //          },
  },

  genderField: {
    width: '45%',
  },
  dayField: {
    width: '25%',
  },
  monthField: {
    width: '35%',
  },
  yearField: {
    width: '30%',
  },

  fieldBirthDateContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px',
    justifyContent: 'space-between',
    paddingLeft: '23px',
  },

  inputBirthDateContainer: {
    width: '80%',
    textAlign: 'left',
    display: 'flex',
    paddingLeft: '10px',
    justifyContent: 'space-between',
  },

  bottonContainer: {
    textAlign: 'center',
  },

  botton: {
    width: '8rem',
    margin: '1.5rem 0',
  },
}));

export default useStyles;
