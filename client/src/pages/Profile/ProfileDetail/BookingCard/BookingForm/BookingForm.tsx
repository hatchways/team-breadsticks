import { useState } from 'react';
import { Box, Typography, Button, Rating, TextField, CircularProgress, FormHelperText } from '@mui/material';
import { TimePicker, LocalizationProvider, MobileDateRangePicker } from '@mui/lab';
import { DateRange } from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateRangeIcon from '@mui/icons-material/DateRange';
import * as Yup from 'yup';
import { Formik, Form, FormikHelpers } from 'formik';
import { Profile } from '../../../../../interface/Profile';
import { createRequest } from '../../../../../helpers/APICalls/request';
import { createNotification } from '../../../../../helpers/APICalls/notifications';
import { useSnackBar } from '../../../../../context/useSnackbarContext';
import { useHistory } from 'react-router-dom';
import useStyles from './useStyles';
import { useHistory } from 'react-router-dom';
import { usePayment } from '../../../../../context/usePaymentContext';

interface Props {
  sitter: Profile;
}

const formSchema: { dateRange: DateRange<Date | null> } = { dateRange: [null, null] };

const validationSchema = Yup.object().shape({
  dateRange: Yup.array().of(Yup.date().typeError('Wrong Date Type').required('Required').nullable()),
});

const BookingForm = ({ sitter }: Props): JSX.Element => {
  const classes = useStyles();

  const history = useHistory();
  const { handleServiceRequestDetails } = usePayment();
  const [dateRange, setDateRange] = useState<DateRange<Date | null>>([null, null]);
  const { updateSnackBarMessage } = useSnackBar();
  const history = useHistory();

  const handleSubmit = async (
    { dateRange }: { dateRange: DateRange<Date> },
    { setSubmitting, resetForm }: FormikHelpers<{ dateRange: DateRange<Date> }>,
  ) => {
            // 'setSubmitting' will be used when we send 'submit request' to backend
    // I guess it's related to 'isSubmitting' and 'onSubmit' in Formik

    const requiredDateRange: any = dateRange;
    const requestedHours: number = Math.abs(requiredDateRange[0] - requiredDateRange[1]) / 36e5;
    const serviceCharge: number = requestedHours * +sitter.sitterWage;

    handleServiceRequestDetails({
      sitterFirstName: sitter.sitterFirstName,
      sitterLastName: sitter.sitterLastName,
      perHourCharge: sitter.sitterWage,
      requestedHours,
      serviceCharge,
    });

    history.push('/payment');
    if (dateRange[0] && dateRange[1]) {
      try {
        await createRequest(sitter.userId, dateRange?.[0], dateRange?.[1]);
      } catch (error: unknown) {
        if (error instanceof Error) {
          updateSnackBarMessage(error.message);
        }
      }

      try {
        await createNotification(
          'Pet Sitting',
          `${sitter.firstName} ${sitter.lastName}'s Request`,
          `${sitter.firstName} ${sitter.lastName} sent a Request!`,
        );
      } catch (error: unknown) {
        if (error instanceof Error) {
          updateSnackBarMessage(error.message);
        }
      }
    }

    setSubmitting(false);
    setDateRange([null, null]);
    resetForm({ values: { dateRange: [null, null] } });
    history.push('/listings');
  };

  const handleChange = (newDateRange: DateRange<Date>) => {
    setDateRange(newDateRange);
  };

  const onValidate = (values: { dateRange: DateRange<Date | null> }) => {
    const errors: { dateRange?: string | null } = {};
    if (!values.dateRange || !values.dateRange[0] || !values.dateRange[1]) {
      errors.dateRange = 'Please choose Date and Time.';
    }
    return errors;
  };

  return (
    <Formik
      initialValues={formSchema}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validate={onValidate}
    >
      {({ handleSubmit, values, touched, errors, isSubmitting }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDateRangePicker
            inputFormat="dd MMM yyyy"
            disableMaskedInput={true}
            startText={null}
            endText={null}
            value={dateRange}
            onChange={(date) => {
              values.dateRange = date;
              return handleChange(values.dateRange);
            }}
            renderInput={(startProps, endProps) => (
              <Form onSubmit={handleSubmit} className={classes.bookingForm}>
                <Typography component="h5" variant="h5" align="center" className={classes.hourlyWage}>
                  {`$ ${sitter.hourlyWage}/ hr`}
                </Typography>
                <Rating name="read-only" value={4} readOnly className={classes.rating} />
                <Box display="flex" flexDirection="column" className={classes.inputField}>
                  <Typography variant="body2" className={classes.label}>
                    Drop In
                  </Typography>
                  <Box display="flex" className={classes.inputField}>
                    <TextField
                      {...startProps}
                      InputProps={{
                        startAdornment: <DateRangeIcon className={classes.dateRangeIcon} />,
                        placeholder: 'Choose Date',
                      }}
                      error={touched.dateRange && Boolean(errors.dateRange)}
                    />
                    <TimePicker
                      inputFormat="hh aaa"
                      value={dateRange[0]}
                      views={['hours']}
                      onChange={(newDateTime) => {
                        values.dateRange[0] = newDateTime;
                        return setDateRange((prevDateRange: DateRange<Date>) => [newDateTime, prevDateRange[1]]);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          className={classes.hourInput}
                          placeholder="Choose Time"
                          error={touched.dateRange && Boolean(errors.dateRange)}
                        />
                      )}
                    />
                  </Box>
                </Box>
                <Box display="flex" flexDirection="column" className={classes.inputField}>
                  <Typography variant="body2" className={classes.label}>
                    Drop Off
                  </Typography>
                  <Box display="flex" className={classes.inputField}>
                    <TextField
                      {...endProps}
                      InputProps={{
                        startAdornment: <DateRangeIcon className={classes.dateRangeIcon} />,
                        placeholder: 'Choose Date',
                      }}
                      error={touched.dateRange && Boolean(errors.dateRange)}
                    />
                    <TimePicker
                      inputFormat="hh aaa"
                      value={dateRange[1]}
                      views={['hours']}
                      onChange={(newDateTime) => {
                        values.dateRange[1] = newDateTime;
                        return setDateRange((prevDateRange: DateRange<Date>) => [prevDateRange[0], newDateTime]);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          className={classes.hourInput}
                          placeholder="Choose Time"
                          error={touched.dateRange && Boolean(errors.dateRange)}
                        />
                      )}
                    />
                  </Box>
                </Box>
                <FormHelperText className={classes.errorHelperText}>
                  {(touched.dateRange && (errors.dateRange || errors.dateRange?.[0] || errors.dateRange?.[1])) || null}
                </FormHelperText>
                <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
                  {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Send Request'}
                </Button>
              </Form>
            )}
          />
        </LocalizationProvider>
      )}
    </Formik>
  );
};

export default BookingForm;
