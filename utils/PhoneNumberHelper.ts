import * as Yup from 'yup';
import { PhoneNumberUtil, PhoneNumberType } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

export function validatePhoneNumberWithErrors(phoneNumber: string, countryCode: string) {
  try {
    const parsedNumber = phoneUtil.parseAndKeepRawInput(phoneNumber, countryCode);

    if (!phoneUtil.isValidNumber(parsedNumber)) {
      throw new Error("Invalid phone number format.");
    }

    return { isValid: true };
  } catch (error) {
    const exampleNumber = phoneUtil.getExampleNumberForType(countryCode, PhoneNumberType.MOBILE);
    return { isValid: false, error: `Invalid phone number format. Valid format: ${phoneUtil.format(exampleNumber, 1)}` };
  }
}

export const parsePhoneNumber = (phoneNumber: string, countryCode: string, formatType = 2) => {
  try {
    const parsedNumber = phoneUtil.parseAndKeepRawInput(phoneNumber, countryCode);
    return phoneUtil.format(parsedNumber, formatType);
  } catch (error) {
    return phoneNumber;
  }
}

export const parseStringToPhoneNumber = (phoneNumber: string)  => {

  console.debug(phoneNumber)

  const parsedNumber = phoneUtil.parse(phoneNumber)
  
  const code = phoneUtil.getRegionCodeForNumber(parsedNumber); 
  const number =  parsedNumber.getNationalNumber()

  console.debug(code, number)
  return { code, number } 
}

export const phoneNumberValidation = Yup.object().shape({
  number: Yup.string().required("Phone number is required")
  .test("is-valid-phone", "Invalid phone number for selected country.", function (value) {
    const countryCode = this.parent?.code || "US";
    
    if (!value || value.trim() === "") return this.createError({ message: "Phone number is required" });

    const { isValid, error } = validatePhoneNumberWithErrors(value, countryCode);
    return isValid ? true : this.createError({ message: error });
  })
});

export const phoneNumberValidationNotRequired = Yup.object().shape({
  number: Yup.string()
  .test("is-valid-phone", "Invalid phone number for selected country.", function (value) {
    const countryCode = this.parent?.code || "US";
    if (!value || value.trim() === "") return true
    const { isValid, error } = validatePhoneNumberWithErrors(value, countryCode);
    return isValid ? true : this.createError({ message: error });
  })
});
