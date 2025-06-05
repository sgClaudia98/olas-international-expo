// methods/PaypalPayment.ts
import { IPaymentMethod, PaymentData, PaymentResponse, PaymentResponseData } from '../types/payment';

export class PaypalPayment implements IPaymentMethod {
    id = 'PayPal'; // This should be unique and match the ID used in the backend
    name = 'PayPal';
    fee = 0; // default, will be overridden by context setup

    async processPayment(
        data: PaymentData,
        preResponse?: (data: PaymentResponseData) => void,
    ): Promise<PaymentResponse> {
        try {
            console.debug('PaypalPayment processPayment', data);
            // Simulate API call to backend to create PayPal payment
            // const response = await fetch('/api/paypal/create-payment', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data),
            // });
           preResponse?.({reference: "MyRef", paymentMethod: this.id});
            
            //if (!response.ok) {
            //    throw new Error('Failed to create PayPal payment');
            //}

            //const paymentResult = await response.json();

        
            return {
                success: false,
                data: {
                    reference: "MyRef",
                    paymentMethod: this.name,
                },
            };
        } catch (error: any) {
            return {
                success: false,
                
            };
        }
    }


}
