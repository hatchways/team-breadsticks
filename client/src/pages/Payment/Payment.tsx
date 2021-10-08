import { useState, useEffect } from 'react';
import PaymentMethodForm from './PaymentMethodForm/PaymentMethodForm';
import masterCardLogo from './CardImages/Mastercard-Logo.svg';
import visaCardLogo from './CardImages/Visacard-Logo.svg';
import starOfLife from './CardImages/star-of-life.png';
import {
  Card,
  Grid,
  Typography,
  Button,
  DialogTitle,
  DialogContent,
  Dialog,
  CardContent,
  Checkbox,
  Box,
} from '@material-ui/core';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { retrievePaymentProfiles, getUserStripeId, setDefaultPaymentProfile } from '../../helpers/APICalls/payment';
import { usePaymentProfiles } from '../../context/usePaymentProfilesContext';

export default function PaymentProfile(): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { loggedInUser } = useAuth();
  const { updatePaymentProfiles, paymentProfiles, updateLoggedInUser } = usePaymentProfiles();
  const [paymentProfileExist, SetPaymentProfileExist] = useState<boolean>(false);
  const [userIds, setUserIds] = useState<any>(false);
  const [defaultPaymentMethodId, setDefaultPaymentMethodId] = useState('');
  const hiddenCardNumber: string[] = [starOfLife, starOfLife, starOfLife, starOfLife];
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getUserPaymentProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUser]);

  const getUserPaymentProfiles = async (): Promise<void> => {
    updateLoggedInUser(loggedInUser);
    const stripeId = await handleGetUserIds();
    if (stripeId) {
      handleGetPaymentProfiles(stripeId);
    }
  };

  const handleGetUserIds = async (): Promise<any> => {
    const user: any = loggedInUser;
    try {
      const { stripeId } = await getUserStripeId(user.id);
      setUserIds({ stripeId, userId: user.id });
      return stripeId;
    } catch (err) {
      const error: any = err;
      setErrorMessage(error.message);
    }
  };

  const handleGetPaymentProfiles = async (stripeId: any): Promise<void> => {
    try {
      const response = await retrievePaymentProfiles(stripeId);
      if (response) {
        updatePaymentProfiles(response.paymentMethods.data);
        setDefaultPaymentMethodId(response.customer.invoice_settings.default_payment_method);
      }

      SetPaymentProfileExist(true);
    } catch (err) {
      const error: any = err;
      setErrorMessage(error.message);
    }
  };

  const handleDefaultPaymentMethod = async (PaymentMethodId: string): Promise<void> => {
    const response = await setDefaultPaymentProfile(PaymentMethodId, userIds.stripeId);
    setDefaultPaymentMethodId(response.invoice_settings.default_payment_method);
  };

  const handleCardExpMonth = (month: string): string => {
    return month.length > 1 ? month : '0' + month;
  };
  const handleCardExpYear = (year: string): string => {
    return year.toString().slice(2);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} sm={9} md={8} lg={7} className={classes.cardContainer}>
        <Card className={classes.card}>
          <Grid item>
            <Typography variant="h5" className={classes.h6} align="center">
              {' '}
              Payment Methods
            </Typography>
          </Grid>
          <Grid item container md={10} className={classes.gridContainer}>
            <Typography variant="h6" className={classes.containerInfo}>
              {paymentProfiles && 'Saved Payment Profiles:'}
              {!paymentProfiles && "You don't have any Payment Profile"}
            </Typography>
            <Grid item container spacing={2} className={classes.grid}>
              {paymentProfiles &&
                paymentProfiles.map((paymentMethod: any) => (
                  <Grid item xs={12} sm={12} md={6} key={paymentMethod.id}>
                    <Card className={classes.payCard}>
                      <Box className={classes.cardHeader}>
                        <img
                          style={{
                            width: '18%',
                            height: paymentMethod.card.brand === 'visa' ? 20 : 30,
                            marginTop: paymentMethod.card.brand === 'visa' ? 15 : 10,
                          }}
                          src={paymentMethod.card.brand === 'visa' ? visaCardLogo : masterCardLogo}
                          alt="Logo"
                        />

                        <Checkbox
                          {...label}
                          checked={paymentMethod.id === defaultPaymentMethodId ? true : false}
                          onChange={() => handleDefaultPaymentMethod(paymentMethod.id)}
                          className={classes.checkBox}
                        />
                      </Box>
                      <CardContent>
                        <Box className={classes.cardNumberContainer}>
                          <Box className={classes.cardNumber}>
                            {hiddenCardNumber.map((starOfLife, key) => (
                              <img key={key} src={starOfLife} style={{ width: 10 }} alt="star" />
                            ))}
                          </Box>
                          <Box className={classes.cardNumber}>
                            {hiddenCardNumber.map((starOfLife, key) => (
                              <img key={key} src={starOfLife} style={{ width: 10 }} alt="star" />
                            ))}
                          </Box>
                          <Box className={classes.cardNumber}>
                            {hiddenCardNumber.map((starOfLife, key) => (
                              <img key={key} src={starOfLife} style={{ width: 10 }} alt="star" />
                            ))}
                          </Box>{' '}
                          <Typography className={classes.cardNumber}>{paymentMethod.card.last4}</Typography>
                        </Box>
                        <Box className={classes.cardDateContainer}>
                          <Typography className={classes.cardDate}>
                            Exp. Date {handleCardExpMonth(paymentMethod.card.exp_month)}/
                            {handleCardExpYear(paymentMethod.card.exp_year)}
                          </Typography>{' '}
                        </Box>
                      </CardContent>
                      <Box className={classes.cardFooter}>
                        <Typography className={classes.h6}>{paymentMethod.billing_details.name}</Typography>
                      </Box>
                    </Card>
                  </Grid>
                ))}
            </Grid>

            <Button variant="outlined" size="large" className={classes.addProfileBtn} onClick={handleOpenDialog}>
              Add New Payment Profile
            </Button>
          </Grid>

          <Dialog open={open} onClose={handleCloseDialog}>
            <DialogTitle>
              {' '}
              <Typography className={classes.dialogTitle} variant="h6">
                Add Card Details
              </Typography>
            </DialogTitle>
            <DialogContent className={classes.dialog}>
              <PaymentMethodForm
                paymentProfileExist={paymentProfileExist}
                handleCloseDialog={handleCloseDialog}
                handleGetPaymentProfiles={handleGetPaymentProfiles}
                userIds={userIds}
                handleGetUserIds={handleGetUserIds}
                SetPaymentProfileExist={SetPaymentProfileExist}
              />
            </DialogContent>
          </Dialog>
        </Card>
      </Grid>
    </Grid>
  );
}
