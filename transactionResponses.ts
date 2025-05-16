var created = {
  id: "9AL07849G5613204K",
  intent: "CAPTURE",
  status: "COMPLETED",
  payment_source: {
    paypal: {
      email_address: "sb-yrwxc40902849@personal.example.com",
      account_id: "ZPTVK6TG67WCJ",
      account_status: "VERIFIED",
      name: { given_name: "John", surname: "Doe" },
      address: { country_code: "US" },
    },
  },
  purchase_units: [
    {
      reference_id: "default",
      amount: { currency_code: "USD", value: "35.00", breakdown: {} },
      payee: {
        email_address: "sb-j4n4j40902773@business.example.com",
        merchant_id: "5AMBQQYW3YTWE",
      },
      shipping: {
        name: { full_name: "John Doe" },
        address: {
          address_line_1: "1 Main St",
          admin_area_2: "San Jose",
          admin_area_1: "CA",
          postal_code: "95131",
          country_code: "US",
        },
      },
      payments: {
        captures: [
          {
            id: "5TP11952NS270801M",
            status: "COMPLETED",
            amount: { currency_code: "USD", value: "35.00" },
            final_capture: true,
            seller_protection: {
              status: "ELIGIBLE",
              dispute_categories: [
                "ITEM_NOT_RECEIVED",
                "UNAUTHORIZED_TRANSACTION",
              ],
            },
            seller_receivable_breakdown: {
              gross_amount: { currency_code: "USD", value: "35.00" },
              paypal_fee: { currency_code: "USD", value: "1.71" },
              net_amount: { currency_code: "USD", value: "33.29" },
            },
            links: [
              {
                href: "https://api.sandbox.paypal.com/v2/payments/captures/5TP11952NS270801M",
                rel: "self",
                method: "GET",
              },
              {
                href: "https://api.sandbox.paypal.com/v2/payments/captures/5TP11952NS270801M/refund",
                rel: "refund",
                method: "POST",
              },
              {
                href: "https://api.sandbox.paypal.com/v2/checkout/orders/9AL07849G5613204K",
                rel: "up",
                method: "GET",
              },
            ],
            create_time: "2025-05-16T21:12:11Z",
            update_time: "2025-05-16T21:12:11Z",
          },
        ],
      },
    },
  ],
  payer: {
    name: { given_name: "John", surname: "Doe" },
    email_address: "sb-yrwxc40902849@personal.example.com",
    payer_id: "ZPTVK6TG67WCJ",
    address: { country_code: "US" },
  },
  create_time: "2025-05-16T21:11:02Z",
  update_time: "2025-05-16T21:12:11Z",
  links: [
    {
      href: "https://api.sandbox.paypal.com/v2/checkout/orders/9AL07849G5613204K",
      rel: "self",
      method: "GET",
    },
  ],
};
