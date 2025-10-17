export const paymentFormInitials = (v) => {
  return {
    client: {
      fullName: v.fullName ?? "",
      phone: v.phone ?? "",
      email: v.email ?? "",
    },
    beneficiary: {
      firstName: "asdasd",
      lastName: "asdasd",
      phone:  "+5357367777",
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