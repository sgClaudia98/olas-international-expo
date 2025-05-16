import * as Yup from "yup";
import { PhoneNumberUtil, PhoneNumberType } from "google-libphonenumber";
import { Toast } from "toastify-react-native";

const phoneUtil = PhoneNumberUtil.getInstance();

export function validatePhoneNumberWithErrors(
  phoneNumber: string,
  countryCode: string
) {
  try {
    const parsedNumber = phoneUtil.parseAndKeepRawInput(
      phoneNumber.toString(),
      countryCode
    );

    if (!phoneUtil.isValidNumber(parsedNumber)) {
      throw new Error("Invalid phone number format.");
    }

    return { isValid: true };
  } catch (error) {
    const exampleNumber = phoneUtil.getExampleNumberForType(
      countryCode,
      PhoneNumberType.MOBILE
    );
    return {
      isValid: false,
      error: `Invalid phone number format. Valid format: ${phoneUtil.format(
        exampleNumber,
        1
      )}`,
    };
  }
}

const DEFAULT_NUMBER_FORMAT = 4;

export const parsePhoneNumber = (
  phoneNumber: string,
  countryCode: string,
  formatType = DEFAULT_NUMBER_FORMAT
) => {
  try {
    const parsedNumber = phoneUtil.parse(phoneNumber.toString(), countryCode);

    return phoneUtil.format(parsedNumber, formatType);
  } catch (error) {
    return "";
  }
};

export const parseStringToPhoneNumber = (
  phoneNumber: string,
  formatType = DEFAULT_NUMBER_FORMAT
) => {
  console.debug(phoneNumber);
  try {
    const parsedNumber = phoneUtil.parse(phoneNumber.toString());

    const code = phoneUtil.getRegionCodeForNumber(parsedNumber);
    const number = phoneUtil.format(parsedNumber, formatType);

    console.debug(code, number);
    return { code, number };
  } catch (e) {
    return {
      code: undefined,
      number: undefined,
    };
  }
};

export const phoneNumberValidation = Yup.object().shape({
  number: Yup.string()
    .required("Phone number is required")
    .test(
      "is-valid-phone",
      "Invalid phone number for selected country.",
      function (value) {
        const countryCode = this.parent?.code || "US";

        if (!value || value.trim() === "")
          return this.createError({ message: "Phone number is required" });

        const { isValid, error } = validatePhoneNumberWithErrors(
          value,
          countryCode
        );
        return isValid ? true : this.createError({ message: error });
      }
    ),
});

export const phoneNumberValidationNotRequired = Yup.object().shape({
  number: Yup.string().test(
    "is-valid-phone",
    "Invalid phone number for selected country.",
    function (value) {
      const countryCode = this.parent?.code || "US";
      if (!value || value.trim() === "") return true;
      const { isValid, error } = validatePhoneNumberWithErrors(
        value,
        countryCode
      );
      return isValid ? true : this.createError({ message: error });
    }
  ),
});
