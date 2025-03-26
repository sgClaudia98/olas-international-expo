import { phoneNumberValidation } from "@/utils/PhoneNumberHelper";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required("First name is required")
    .matches(/^[A-Za-z]+$/, "First name must contain only letters"),
  
  lastName: Yup.string()
    .trim()
    .required("Last name is required")
    .matches(/^[A-Za-z]+$/, "Last name must contain only letters"),

  phone: phoneNumberValidation,

  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),
});

export {validationSchema};
