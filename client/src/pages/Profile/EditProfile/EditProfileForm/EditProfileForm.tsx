import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Profiles } from '../../../../interface/Profile';
import * as yup from 'yup';
import { Formik, FormikHelpers } from 'formik'; // import useStyles from '../useStyles'
import useStyles from '../useStyles';
import { array } from 'yup/lib/locale';
import { Box, CircularProgress } from '@material-ui/core';

interface props {
  handleSubmit: (userData: Profiles, { setStatus, setSubmitting }: FormikHelpers<Profiles>) => void;
  userData: Profiles;
  months: string[];
}
const phoneRegExp = /[0-9]{10}/gm;
const addressRegExp = /^[a-z]+[,]\s*[a-z]+\s*[a-z]*$/gim;

export default function EditProfileForm({ handleSubmit, userData, months }: props): JSX.Element {
  const classes = useStyles();
  const generateRang = (min: number, max: number, start: number): string[] => {
    let arrayNum: string[] = [];
    for (let i = start; i <= max; i++) {
      arrayNum = [...arrayNum, i + ''];
    }
    return arrayNum;
  };

  const years: string[] = generateRang(1988, 2021, 1988);
  const monthOne: string[] = generateRang(1, 31, 1);
  const monthTwo: string[] = generateRang(1, 30, 1);
  const monthThree: string[] = generateRang(1, 29, 1);
  const [daysOfMonth, setDaysOfMonth] = useState<Array<string>>(monthOne);

  const handleChandeMonth = (
    e: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ): void => {
    const value = e.target?.value;
    if (value === 'February') {
      setDaysOfMonth(monthThree);
    } else if (value === 'September' || value === 'April ' || value === 'June' || value === 'November') {
      setDaysOfMonth(monthTwo);
    } else {
      setDaysOfMonth(monthOne);
    }
  };

  return (
    <Paper className={classes.formContainer} elevation={6}>
      <Box style={{ margin: ' 3rem 0' }}>
        <Typography align="center" style={{ fontWeight: 'bold' }} variant="h6">
          {' '}
          Edit Profile{' '}
        </Typography>
      </Box>

      <Formik
        validateOnChange={true}
        initialValues={userData}
        validationSchema={yup.object().shape({
          firstName: yup.string().required(' Your first name is required'),
          lastName: yup.string().required(' Your last name is required'),
          gender: yup.string().required('Your gender is required'),
          //   phone: yup
          // .string()
          // .matches(phoneRegExp, 'Phone number is not valid (e.g., 1231231234 without "-")')
          // .required('Phone number is required'),
          //   email: yup.string().required('Email is required').email('Email is not valid'),
          //   address: yup
          //     .string()
          //     .trim()
          //     .matches(addressRegExp, 'Address is not valid (e.g., City, Province (Comma is required))')
          //     .required('Address is required'),
        })}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, handleChange, errors, touched, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box className={classes.fieldContainer}>
              <label htmlFor="last-name" className={classes.label}>
                FIRST NAME
              </label>

              <Box className={classes.inputContainer}>
                <TextField
                  className={classes.field}
                  id="firstName"
                  placeholder="John"
                  name="firstName"
                  type="input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.firstName ? errors.firstName : ''}
                  error={touched.firstName && Boolean(errors.firstName)}
                  value={values.firstName}
                  required
                  variant="outlined"
                  fullWidth
                />
              </Box>
            </Box>
            <Box className={classes.fieldContainer}>
              <label className={classes.label}>LAST NAME</label>
              <Box className={classes.inputContainer}>
                <TextField
                  className={classes.field}
                  id="lastName"
                  placeholder="Doe"
                  name="lastName"
                  type="input"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.lastName ? errors.lastName : ''}
                  error={touched.lastName && Boolean(errors.lastName)}
                  value={values.lastName}
                  required
                  variant="outlined"
                  fullWidth
                  //   error={!!errorText}
                />
              </Box>
            </Box>
            <Box className={classes.fieldContainer}>
              <label className={classes.label}>GENDER</label>
              <Box className={classes.inputContainer}>
                <FormControl className={classes.genderField} variant="outlined">
                  <InputLabel id="demo-simple-select-label">Male</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="gender"
                    placeholder="Male"
                    label="Male"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    // helperText={touched.gender ? errors.gender : ''}
                    // error={touched.gender && Boolean(errors.gender)}
                    value={values.gender}
                    name="gender"
                  >
                    <MenuItem value={'Male'}>Male</MenuItem>
                    <MenuItem value={'Female'}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box className={classes.fieldContainer}>
              <label className={classes.label}>BIRTH DATE</label>
              <Box className={classes.inputBirthDateContainer}>
                <FormControl className={classes.monthField} variant="outlined">
                  <InputLabel id="demo-simple-select-label">June</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="month"
                    // placeholder="June"
                    label="June"
                    onChange={(e) => {
                      handleChange(e);
                      handleChandeMonth(e);
                    }}
                    onBlur={handleBlur}
                    value={values.month}
                    name="month"
                  >
                    {months.map((month) => (
                      <MenuItem key={month} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl className={classes.dayField} variant="outlined">
                  <InputLabel id="demo-simple-select-label">day</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="day"
                    placeholder="day"
                    label="day"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.day}
                    name="day"
                  >
                    {daysOfMonth.map((day) => (
                      <MenuItem key={day} value={day}>
                        {day}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className={classes.yearField} variant="outlined">
                  <InputLabel id="demo-simple-select-label">1988</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="year"
                    name="year"
                    placeholder="year"
                    label="year"
                    type="string"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.year}
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box className={classes.fieldContainer}>
              <label className={classes.label}>EMAIL ADDRESS</label>
              <Box className={classes.inputContainer}>
                <TextField
                  className={classes.field}
                  id="email"
                  placeholder="John-Doe@gmail.com"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.email ? errors.email : ''}
                  error={touched.email && Boolean(errors.email)}
                  value={values.email}
                  required
                  disabled
                  variant="outlined"
                  fullWidth
                />
              </Box>
            </Box>
            <Box className={classes.fieldContainer}>
              <label className={classes.label}>PHONE NUMBER</label>
              <Box className={classes.inputphoneNumberContainer}>
                <label style={{ fontFamily: 'italic' }}>
                  {values.phoneNumber ? 'Your Phone Number Is' : 'No Phone Number Entered'}
                </label>

                <TextField
                  className={classes.field}
                  id="phoneNumber"
                  placeholder="Add Phone Number"
                  name="phoneNumber"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.phoneNumber ? errors.phoneNumber : ''}
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  value={values.phoneNumber}
                  variant="outlined"
                  color="secondary"
                />
              </Box>
            </Box>
            <Box className={classes.fieldContainer}>
              <label className={classes.label}>WHERE YOU LIVE</label>
              <Box className={classes.inputContainer}>
                <TextField
                  className={classes.field}
                  id="address"
                  placeholder="Address"
                  name="address"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  variant="outlined"
                  fullWidth
                  // error={!!errorText}
                />
              </Box>
            </Box>
            <Box className={classes.fieldContainer}>
              <label className={classes.label}>DESCRIBE YOURSELF</label>
              <Box className={classes.inputContainer}>
                <TextField
                  className={classes.field}
                  id="description"
                  placeholder="About you"
                  name="description"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  // error={!!errorText}
                />
              </Box>
            </Box>
            <Box className={classes.bottonContainer}>
              <Button
                variant="contained"
                color="primary"
                className={classes.botton}
                size="large"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress style={{ fontSize: 0, width: '20px', height: '20px' }} /> : 'SAVE'}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Paper>
  );
}
