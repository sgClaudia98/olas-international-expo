const PAYPAL_BASE_URL = 'https://api.sandbox.paypal.com'; // Use sandbox for testing
const CLIENT_ID = 'YOUR_PAYPAL_CLIENT_ID'; // Replace with your PayPal client ID
const CLIENT_SECRET = 'YOUR_PAYPAL_CLIENT_SECRET'; // Replace with your PayPal client secret

export const PayPalService = {
  /**
   * Generate an access token using PayPal's OAuth2 API.
   */
  async generateAccessToken(): Promise<string> {
    const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      throw new Error(`Failed to generate access token: ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
  },

  /**
   * Create a payment and get the approval URL.
   */
  async createPayment(accessToken: string, amount: string, currency: string = 'USD'): Promise<string> {
    const response = await fetch(`${PAYPAL_BASE_URL}/v1/payments/payment`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'sale',
        payer: {
          payment_method: 'paypal',
        },
        transactions: [
          {
            amount: {
              total: amount,
              currency,
            },
            description: 'Payment through Olas International',
          },
        ],
        redirect_urls: {
          return_url: 'https://your-app.com/success', // Replace with your success URL
          cancel_url: 'https://your-app.com/cancel', // Replace with your cancel URL
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create payment: ${response.statusText}`);
    }

    const data = await response.json();
    const approvalUrl = data.links.find((link: any) => link.rel === 'approval_url').href;
    return approvalUrl;
  },

  /**
   * Execute a payment after the user approves it.
   */
  async executePayment(accessToken: string, paymentId: string, payerId: string): Promise<any> {
    const response = await fetch(`${PAYPAL_BASE_URL}/v1/payments/payment/${paymentId}/execute`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payer_id: payerId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to execute payment: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  },
};


/* Usage Example:
async function handlePayPalPayment() {
  try {
    const accessToken = await PayPalService.generateAccessToken();
    const approvalUrl = await PayPalService.createPayment(accessToken, '10.00', 'USD');
    console.log('Redirect user to:', approvalUrl);
    // Use a WebView or Linking API to open the approval URL
  } catch (error) {
    console.error('PayPal payment error:', error);
  }
}
  */