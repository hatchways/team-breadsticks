import { withRouter } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { TextField, CircularProgress } from '@material-ui/core';
import { StripeCardElement, StripeCardElementOptions, StripeCardNumberElement } from '@stripe/stripe-js';
import { Formik, FormikHelpers } from 'formik';
import useStyles from '../useStyles';
import Button from '@material-ui/core/Button';
import { createCustomer, addPaymentprofile, setDefaultPaymentProfile } from '../../../helpers/APICalls/payment';
import * as Yup from 'yup';
import { iframeStyles } from './CardElementStyles/CardElementStyles';
import { usePayment } from '../../../context/usePaymentContext';

interface BillingDetails {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

function PaymentMethodForm({
  paymentProfileExist,
  userIds,
  handleCloseDialog,
  handleGetUserIds,
  handleGetPaymentProfiles,
  setDefaultPaymentMethodId,
}: any): JSX.Element {
  const elements = useElements();
  const stripe = useStripe();
  const classes = useStyles();
  const { serviceRequestDetails, handlePayDialog } = usePayment();
  const cardElementOpts: StripeCardElementOptions | undefined = {
    iconStyle: 'solid',
    style: iframeStyles,
    hidePostalCode: true,
  };

  const userDetails: BillingDetails = {
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  };

  const handleSubmit = async (
    customerDetails: BillingDetails,
    { setStatus, setSubmitting }: FormikHelpers<BillingDetails>,
  ): Promise<void> => {
    if (!stripe || !elements) {
      return;
    }

    const billingDetails = {
      address: {
        city: customerDetails.city,
        postal_code: customerDetails.zip,
        line1: customerDetails.address,
        state: customerDetails.state,
      },
      email: customerDetails.email,
      name: customerDetails.name,
    };

    const cardElement:
      | StripeCardElement
      | StripeCardNumberElement
      | {
          token: string;
        }
      | null = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: billingDetails,
      });
      if (!error) {
        if (paymentProfileExist && paymentMethod) {
          const paymentIds = {
            paymentMethodId: paymentMethod.id,
            userStripeId: userIds.stripeId,
          };
          await addPaymentprofile(paymentIds);
          await handleGetPaymentProfiles(userIds.stripeId);
          handleCloseDialog();
        } else {
          const { stripeId } = await createCustomer(paymentMethod, userIds.userId);
          await handleGetPaymentProfiles(stripeId);
          const customerStripeId: any = await handleGetUserIds();

          if (paymentMethod) {
            const response = await setDefaultPaymentProfile(paymentMethod.id, customerStripeId);
            setDefaultPaymentMethodId(response.invoice_settings.default_payment_method);
          }
          handleCloseDialog();
          if (serviceRequestDetails) {
            handlePayDialog(true);
          }
        }
      } else {
        setSubmitting(false);
      }
    }
  };

  return (
    <Formik
      initialValues={userDetails}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email('Email is not valid'),
        address: Yup.string().required('Address is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        zip: Yup.string().required('Zip is required'),
      })}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleChange, errors, touched, handleBlur, handleSubmit }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            className={classes.field}
            placeholder="Name"
            id="name"
            name="name"
            type="input"
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.name ? errors.name : ''}
            error={touched.name && Boolean(errors.name)}
            variant="outlined"
            fullWidth
            size="small"
          />

          <TextField
            className={classes.field}
            placeholder="Email Address"
            id="email"
            name="email"
            type="input"
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.email ? errors.email : ''}
            error={touched.email && Boolean(errors.email)}
            required
            variant="outlined"
            fullWidth
            size="small"
          />
          <TextField
            className={classes.field}
            placeholder="Address"
            name="address"
            id="address"
            type="input"
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.address ? errors.address : ''}
            error={touched.address && Boolean(errors.address)}
            required
            variant="outlined"
            fullWidth
            size="small"
          />
          <TextField
            className={classes.field}
            placeholder="City"
            name="city"
            id="city"
            type="input"
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.city ? errors.city : ''}
            error={touched.city && Boolean(errors.city)}
            required
            variant="outlined"
            fullWidth
            size="small"
          />
          <TextField
            className={classes.field}
            placeholder="State"
            name="state"
            id="state"
            type="input"
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.state ? errors.state : ''}
            error={touched.state && Boolean(errors.state)}
            required
            variant="outlined"
            fullWidth
            size="small"
          />
          <TextField
            className={classes.field}
            placeholder="Zip"
            name="zip"
            id="zip"
            type="input"
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.zip ? errors.zip : ''}
            error={touched.zip && Boolean(errors.zip)}
            required
            variant="outlined"
            fullWidth
            size="small"
          />

          <div className={classes.cardElementContainer}>
            <CardElement options={cardElementOpts} />
          </div>

          <div className={classes.buttonContainer}>
            {' '}
            <Button type="submit" variant="contained" color="primary" className={classes.submitButton}>
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Save'}
            </Button>
            <Button onClick={handleCloseDialog} variant="contained" color="secondary" className={classes.cancelButton}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default withRouter(PaymentMethodForm);
