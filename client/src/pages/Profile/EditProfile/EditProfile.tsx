import { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Grid,
  FormControl,
  MenuItem,
  Select,
  Typography,
  Paper,
  Box,
  Switch,
} from '@material-ui/core';
import useStyles from './useStyles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../../context/useAuthContext';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { Gender, Profile } from '../../../interface/Profile';
import { createProfile, getMyProfile, updateProfile } from '../../../helpers/APICalls/profiles';
import { useHistory } from 'react-router-dom';

const phoneRegExp = /[0-9]{10}/gm;
const addressRegExp = /^[a-z]+[,]\s*[a-z]+\s*[a-z]*$/gim;

const validationSchema = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  gender: yup.string().required('Gender is required'),
  birth: yup.string().required('Birth is required'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid (e.g., 1231231234 without "-")')
    .required('Phone number is required'),
  address: yup
    .string()
    .trim()
    .matches(addressRegExp, 'Address is not valid (e.g., City, Province (Comma is required))')
    .required('Address is required'),
  description: yup.string().required('Your description is required'),
});

const EditProfile = (): JSX.Element => {
  const { loggedInUser } = useAuth();
  const history = useHistory();
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const [profileId, setProfileId] = useState('');
  const [fetchedProfile, setFetchedProfile] = useState({
    userId: loggedInUser?.id,
    firstName: '',
    lastName: '',
    gender: 'Male' as Gender,
    birth: '',
    phone: '',
    address: '',
    description: '',
    isSitter: false,
    title: '',
    hourlyWage: 0,
  });

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    try {
      const fetchProfiles = async () => {
        const myProfile = await getMyProfile();
        if (myProfile._id) {
          setFetchedProfile(myProfile);
          setProfileId(myProfile._id);
          setIsEditMode(true);
        }
      };
      fetchProfiles();
    } catch (error: unknown) {
      if (error instanceof Error) {
        updateSnackBarMessage(error.message);
      }
    }
  }, [updateSnackBarMessage]);

  const handleSubmit = async (values: {
    userId: string | undefined;
    firstName: string;
    lastName: string;
    gender: Gender;
    birth: string;
    phone: string;
    address: string;
    description: string;
    isSitter: boolean;
    title: string;
    hourlyWage: number;
  }) => {
    if (isEditMode) {
      try {
        await updateProfile(profileId, values as Profile);
        updateSnackBarMessage('Updated Profile Successfully');
      } catch (error: unknown) {
        if (error instanceof Error) {
          updateSnackBarMessage(error.message);
        }
      }
    } else {
      try {
        await createProfile(values);
        updateSnackBarMessage('Created Profile Successfully');
      } catch (error: unknown) {
        if (error instanceof Error) {
          updateSnackBarMessage(error.message);
        }
      }
    }
    history.push('/profile');
  };

  const formik = useFormik({
    initialValues: fetchedProfile,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
    enableReinitialize: true,
  });

  return (
    <Grid item xs={12} sm={9} elevation={6} component={Paper} square>
      <Box
        width="80%"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        className={classes.editProfileContainer}
      >
        <Typography variant="h4" className={classes.title}>
          Edit Profile
        </Typography>
        <Typography variant="body1" color="primary">
          Want to become a sitter? Create your Profile first
        </Typography>
        <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
          <Box display="flex" alignItems="center" className={classes.box}>
            <label htmlFor="first-name" className={classes.label}>
              first name
            </label>
            <TextField
              type="text"
              id="first-name"
              placeholder="John"
              variant="outlined"
              name="firstName"
              className={classes.textField}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              onBlur={formik.handleBlur}
            />
          </Box>
          <Box display="flex" alignItems="center" className={classes.box}>
            <label htmlFor="last-name" className={classes.label}>
              last name
            </label>
            <TextField
              type="text"
              id="last-name"
              placeholder="Doe"
              variant="outlined"
              className={classes.textField}
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              onBlur={formik.handleBlur}
            />
          </Box>
          <Box display="flex" alignItems="center" className={classes.box}>
            <label htmlFor="select-outlined" className={classes.label}>
              gender
            </label>
            <FormControl variant="outlined">
              <Select
                labelId="select-outlined-label"
                id="gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                className={classes.select}
              >
                <MenuItem value={'Male'}>Male</MenuItem>
                <MenuItem value={'Female'}>Female</MenuItem>
                <MenuItem value={'Other'}>Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box display="flex" alignItems="center" className={classes.box}>
            <label htmlFor="birth" className={classes.label}>
              birth date
            </label>
            <TextField
              type="date"
              id="birth"
              variant="outlined"
              className={classes.textField}
              name="birth"
              value={formik.values.birth}
              onChange={formik.handleChange}
            />
          </Box>
          <Box display="flex" alignItems="center" className={classes.box}>
            <label htmlFor="email" className={classes.label}>
              email address
            </label>
            <Typography className={classes.textField}>{loggedInUser?.email}</Typography>
          </Box>
          <Box display="flex" alignItems="center" className={classes.box}>
            <label className={classes.label}>phone</label>
            <TextField
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter phone number without '-'"
              variant="outlined"
              className={classes.textField}
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              onBlur={formik.handleBlur}
            />
          </Box>
          <Box display="flex" alignItems="center" className={classes.box}>
            <label htmlFor="where-live" className={classes.label}>
              city and state
            </label>
            <TextField
              type="text"
              id="where-live"
              placeholder="City, Province (Comma is required)"
              variant="outlined"
              className={classes.textField}
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              onBlur={formik.handleBlur}
            />
          </Box>
          <Box display="flex" alignItems="center" className={classes.box}>
            <label htmlFor="describe" className={classes.label}>
              describe your self
            </label>
            <TextField
              id="describe"
              placeholder="About you"
              variant="outlined"
              className={classes.textField}
              multiline
              rows={3}
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              onBlur={formik.handleBlur}
            />
          </Box>
          {isEditMode && (
            <Box display="flex" alignItems="center" className={classes.box}>
              <label htmlFor="isSitter" className={classes.label}>
                Become a Sitter
              </label>
              <Switch
                id="isSitter"
                name="isSitter"
                value={formik.values.isSitter}
                checked={formik.values.isSitter}
                onChange={formik.handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Box>
          )}
          {isEditMode && formik.values.isSitter && (
            <>
              <Box display="flex" alignItems="center" className={classes.box}>
                <label htmlFor="title" className={classes.label}>
                  Title
                </label>
                <TextField
                  type="text"
                  id="title"
                  placeholder="Title"
                  variant="outlined"
                  className={classes.textField}
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                  onBlur={formik.handleBlur}
                />
              </Box>
              <Box display="flex" alignItems="center" className={classes.box}>
                <label htmlFor="where-live" className={classes.label}>
                  Hourly Wage
                </label>
                <TextField
                  type="number"
                  id="hourlyWage"
                  variant="outlined"
                  className={classes.textField}
                  name="hourlyWage"
                  value={formik.values.hourlyWage}
                  onChange={formik.handleChange}
                  error={formik.touched.hourlyWage && Boolean(formik.errors.hourlyWage)}
                  helperText={formik.touched.hourlyWage && formik.errors.hourlyWage}
                  onBlur={formik.handleBlur}
                />
              </Box>
            </>
          )}
          <Button variant="contained" color="secondary" size="large" className={classes.button} type="submit">
            save
          </Button>
        </form>
      </Box>
    </Grid>
  );
};

export default EditProfile;
