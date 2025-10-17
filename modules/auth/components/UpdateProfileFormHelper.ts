import { phoneStringValidation } from "@/utils/PhoneNumberHelper";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .matches(/^[A-Za-zÀ-ÿ\s]+$/, "First name must contain only letters"),

  lastName: Yup.string()
    .trim()
    .matches(/^[A-Za-zÀ-ÿ\s]+$/, "Last name must contain only letters"),

  phone: phoneStringValidation,

  email: Yup.string()
    .trim()
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Invalid email format")
    .required("Email is required"),
});

export {validationSchema};
