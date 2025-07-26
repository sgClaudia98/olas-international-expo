export const paymentFormInitials = (v) => {
  return {
    client: {
      fullName:  "Claudia",
      phone:{
            number: "12312312312",
            code: "US",
          },
      email:  "claudia@example.com",
    },
    beneficiary: {
      firstName: "asdasd",
      lastName: "asdasd",
      phone: {
        number: "57367777",
        code: v.destinationCountry,
      },
      idDocument: "asdasd",
      address: {
        state: v.province,
        city: "asdasd",
        line1: "asdas",
        line2: "asdasd",
        zipCode: v.destinationCountry !== "CU" ? "" : "CU",
      },
    },
    notes: {},
    paymentMethod: "PayPal",
  };
}