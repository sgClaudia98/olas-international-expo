import { PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

export function validatePhoneNumberWithErrors(phoneNumber: string, countryCode: string) {
  try {
    if (!phoneNumber || phoneNumber.trim() === "") {
      return { isValid: false, error: "Phone number is required." };
    }

    const parsedNumber = phoneUtil.parseAndKeepRawInput(phoneNumber, countryCode);

    if (!phoneUtil.isValidNumber(parsedNumber)) {
      return { isValid: false, error: "Invalid phone number for selected country." };
    }

    const formatted = phoneUtil.format(parsedNumber, 2);

    return { isValid: true, formatted };
  } catch (error) {
    return { isValid: false, error: "Invalid phone number format." };
  }
}