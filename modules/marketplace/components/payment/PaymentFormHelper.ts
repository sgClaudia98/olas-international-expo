import * as Yup from 'yup';
import { CreateMarketBookingRequest } from "../../services/interfaces/bookingDetail";
import { phoneStringValidation } from '@/utils/PhoneNumberHelper';

export interface PaymentFormValues {
  client: {
      fullName: string;
      phone: string;
      email: string;
  };
  beneficiary: {
      firstName: string;
      lastName: string;
      phone: string;
      idDocument: string;
      address: {
          state: string;
          city: string;
          line1: string;
          line2: string;
          zipCode: string;
      };
  };
  notes: {};
  paymentMethod: string;
}

export const mapValuesToPayload = (
  values: PaymentFormValues
): CreateMarketBookingRequest => {
  const { client, beneficiary, notes, paymentMethod } = values;
  return {
    client: {
      fullName: client.fullName || "",
      phone: client.phone || "",
      email: client.email || "",
    },
    beneficiary: {
      firstName: beneficiary.firstName || "",
      lastName: beneficiary.lastName || "",
      phone: beneficiary.phone || "",
      idDocument: beneficiary.idDocument || "",
      address: {
        line1: beneficiary.address?.line1 || "",
        line2: beneficiary.address?.line2 || "",
        city: beneficiary.address?.city || "",
        state: beneficiary.address?.state || "",
        zipCode: beneficiary.address?.zipCode || "",
      },
    },
    paymentMethod: paymentMethod || "",
    notes,
  };
};



const validationSchemas = {
  1: Yup.object().shape({
    client: Yup.object().shape({
      fullName: Yup.string().max(50, 'Must be 50 characters or less').required('Full Name is required'),
      phone: phoneStringValidation,
      email: Yup.string().matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,'Invalid email address').required('Email is required'),
    }),
  }),
  2: Yup.object().shape({
    beneficiary: Yup.object().shape({
      firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
      lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
      phone: phoneStringValidation,
      idDocument: Yup.string().required('Required'),
      address: Yup.object().shape({
        state: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        line1: Yup.string().required('Required'),
        line2: Yup.string().nullable(),
        zipCode: Yup.string().required('Required'),
      }),
    }),
  }),
};

export default validationSchemas;

