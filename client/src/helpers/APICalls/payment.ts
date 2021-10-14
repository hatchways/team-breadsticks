import { FetchOptions } from '../../interface/FetchOptions';
import axios from 'axios';

export const createCustomer = async (paymentMethod: any, userId: string): Promise<any> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentMethod),
    credentials: 'include',
  };
  return await fetch(`/payment-profile/create/${userId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const addPaymentprofile = async (paymentMethod: any): Promise<any> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentMethod),
    credentials: 'include',
  };
  return await fetch(`/payment-profile/add-payment-profile`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const retrievePaymentProfiles = async (customerId: string): Promise<any> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/payment-profile/retrieve/${customerId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const getUserStripeId = async (userId: string): Promise<any> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/payment-profile/user-stripe-id/${userId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const setDefaultPaymentProfile = async (paymentMethodId: string, userStripeId: string): Promise<any> => {
  return await axios
    .post(`/payment-profile/set-default-payment-method`, { userStripeId, paymentMethodId })
    .then((res) => res.data)
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const createPaymentIntent = async (
  amount: string,
  paymentMethodId: string,
  customerId: string,
): Promise<any> => {
  return await axios
    .post(`/payment/create-payment-intent`, { amount, paymentMethodId, customerId })
    .then((res) => res.data)
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
