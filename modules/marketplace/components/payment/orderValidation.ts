import * as Yup from 'yup';

const phoneNumberValidation = Yup.string()
  .matches(/^\+?[1-9]\d{6,14}$/, 'Invalid phone number. Must be a valid international format.')
  .required('Phone Number is required');

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
