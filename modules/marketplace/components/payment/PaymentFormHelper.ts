import * as Yup from 'yup';
import { validatePhoneNumberWithErrors } from "./PhoneNumberHelper";

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
}

const phoneNumberValidation = Yup.string()
  .required("Phone number is required")
  .test("is-valid-phone", "Invalid phone number for selected country.", function (value) {
    const countryCode = this.parent?.code || "US";
    if (!value) return this.createError({ message: "Phone number is required" });

    const { isValid, error } = validatePhoneNumberWithErrors(value, countryCode);
    return isValid ? true : this.createError({ message: error });
  });


const validationSchemas = {
  1: Yup.object().shape({
    client: Yup.object().shape({
      fullName: Yup.string().max(50, 'Must be 50 characters or less').required('Full Name is required'),
      phone: phoneNumberValidation,
      email: Yup.string().email('Invalid email address').required('Email is required'),
    }),
  }),
  2: Yup.object().shape({
    beneficiary: Yup.object().shape({
      firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
      lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
      phone: phoneNumberValidation,
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

