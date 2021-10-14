/* eslint-disable prettier/prettier */
import { useState, useContext, createContext, FunctionComponent } from 'react';
import { User } from '../interface/User';

interface IPaymentProfiles {
  updatePaymentProfiles: (UserPaymentProfiles: any) => void;
  updateLoggedInUser: (loggedInuser: any) => void;
  paymentProfiles: any;
  loggedInuserDetails: User | null | undefined;
}

export const PaymentProfilesContext = createContext<IPaymentProfiles>({
  updatePaymentProfiles: () => null,
  updateLoggedInUser: () => null,
  paymentProfiles: undefined,
  loggedInuserDetails: undefined,
});

export const PaymentProfilesProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [paymentProfiles, setPaymentProfiles] = useState<IPaymentProfiles | undefined>(undefined);
  const [loggedInuserDetails, setLoggedInuserDetails] = useState<IPaymentProfiles['loggedInuserDetails']>(undefined);
  const updatePaymentProfiles = (UserPaymentProfiles: any) => {
    setPaymentProfiles(UserPaymentProfiles);
  };
  const updateLoggedInUser = (loggedInuser: User | null | undefined) => {
    if (loggedInuserDetails !== loggedInuser) {
      setPaymentProfiles(undefined);
      setLoggedInuserDetails(loggedInuser);
    }
  };
  return (
    <PaymentProfilesContext.Provider
      value={{ updatePaymentProfiles, paymentProfiles, updateLoggedInUser, loggedInuserDetails }}
    >
      {children}
    </PaymentProfilesContext.Provider>
  );
};

export function usePaymentProfiles(): IPaymentProfiles {
  return useContext(PaymentProfilesContext);
}
