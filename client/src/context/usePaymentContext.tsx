import { useState, useContext, createContext, FunctionComponent } from 'react';
import { User } from '../interface/User';
import { serviceRequestDetails } from '../interface/serviceRequestDetails';

interface PaymentProfiles {
  handleServiceRequestDetails: (serviceRequestDetails: serviceRequestDetails | undefined) => void;
  handlePayDialog: (openDialog: boolean) => void;
  serviceRequestDetails: serviceRequestDetails | undefined;
  openDialog: boolean;
}

export const PaymentContext = createContext<PaymentProfiles>({
  handleServiceRequestDetails: () => null,
  handlePayDialog: () => null,
  serviceRequestDetails: undefined,
  openDialog: false,
});

export const PaymentProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [serviceRequestDetails, setServiceRequestDetails] =
    useState<PaymentProfiles['serviceRequestDetails']>(undefined);
  const [openDialog, setOpenDialog] = useState(false);

  const handlePayDialog = (openDialog: boolean): void => {
    setOpenDialog(openDialog);
  };
  const handleServiceRequestDetails = (serviceRequestDetails: PaymentProfiles['serviceRequestDetails']) => {
    setServiceRequestDetails(serviceRequestDetails);
  };
  return (
    <PaymentContext.Provider
      value={{ handleServiceRequestDetails, serviceRequestDetails, openDialog, handlePayDialog }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export function usePayment(): PaymentProfiles {
  return useContext(PaymentContext);
}
