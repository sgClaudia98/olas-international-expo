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

const DEFAULT_NUMBER_FORMAT = 0; // E164 format: +34604833094
const DEFAULT_NUMBER_PARSE_FORMAT = 2; // NATIONAL format: 604833094
const INTERNATIONAL_FORMAT = 1; // INTERNATIONAL format: +34 604 83 30 94

export const formatPhoneNumberInternational = (phoneNumber: string) => {
  try {
    const parsedNumber = phoneUtil.parse(phoneNumber.toString());
    return phoneUtil.format(parsedNumber, INTERNATIONAL_FORMAT);
  } catch (error) {
    return phoneNumber; // Return original if parsing fails
  }
};

export const parsePhoneNumber = (
  phoneNumber: string,
  countryCode: string,
  formatType = DEFAULT_NUMBER_PARSE_FORMAT
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
  formatType = DEFAULT_NUMBER_PARSE_FORMAT
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

export const phoneStringValidation = Yup.string().test(
  "is-valid-phone",
  "Invalid phone number",
  function (value) {
    if (!value || value.trim() === "") return true;
    try {
      const parsedNumber = phoneUtil.parse(value.toString());
      return phoneUtil.isValidNumber(parsedNumber);
    } catch (error) {
      return false;
    }
  }
);
