# Payment Module Documentation

## Overview

The Payment Module handles all payment processing functionality in Olas International Expo. It's designed as an extensible system that can support multiple payment providers while maintaining a consistent interface. Currently, the module is implementing PayPal integration with plans to support additional payment methods.

## Module Structure

```
modules/payment/
├── components/        # Payment UI components
│   └── buttons/      # Payment method buttons
├── hooks/            # Custom payment hooks
├── providers/        # Payment context providers
├── types/            # TypeScript type definitions
└── utils/            # Helper functions
```

## Architecture

The payment module follows a provider-based architecture where:
1. A central `PaymentProvider` manages payment method selection
2. Individual payment buttons handle provider-specific logic
3. A generic checkout button provides a consistent interface
4. Platform-specific implementations handle web vs mobile differences

## Core Components

### PaymentProvider (`providers/PaymentProvider.tsx`)

Central context provider managing payment state and method selection.

**Context Value:**
```typescript
interface PaymentContextType {
  selectedMethod: PaymentMethod | null;
  setSelectedMethod: (method: PaymentMethod) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
  paymentError: string | null;
  setPaymentError: (error: string | null) => void;
}
```

**Usage:**
```tsx
<PaymentProvider>
  <CheckoutFlow />
</PaymentProvider>
```

### PaymentProviders (`providers/PaymentProviders.tsx` & `.web.tsx`)

Platform-specific wrapper components that inject payment SDK providers.

**Web Implementation:**
- Loads PayPal SDK script
- Configures PayPal provider with credentials
- Handles script loading states

**Mobile Implementation:**
- Native payment SDK integration (planned)
- Platform-specific payment sheets

## Payment Buttons

### GenericCheckoutButton (`components/buttons/GenericCheckoutButton.tsx`)

Extensible checkout button that can render different payment methods.

**Props:**
```typescript
interface GenericCheckoutButtonProps {
  amount: number;
  currency?: string;
  onSuccess: (details: PaymentDetails) => void;
  onError: (error: Error) => void;
  onCancel?: () => void;
  paymentMethod: PaymentMethod;
  metadata?: Record<string, any>;
}
```

**Features:**
- Dynamic payment method rendering
- Consistent error handling
- Loading states
- Extensible for new payment methods

### PayPalButton (`components/buttons/PayPalButton.tsx`)

PayPal-specific implementation of payment button.

**Features:**
- PayPal SDK integration
- Order creation and capture
- Error handling
- Success callbacks

**Implementation:**
```tsx
<PayPalButton
  amount={100.00}
  onSuccess={(details) => handlePaymentSuccess(details)}
  onError={(error) => handlePaymentError(error)}
/>
```

### PayPalCardButton (`components/buttons/PayPalCardButton.tsx`)

PayPal card fields implementation for direct card payments.

**Features:**
- Hosted card fields
- PCI compliance
- Card validation
- 3D Secure support (planned)

### PaymentButtons (`components/PaymentButtons.tsx`)

Collection of all available payment method buttons.

**Features:**
- Payment method selection UI
- Dynamic button rendering
- Method availability checking
- Platform-specific layouts

## Hooks

### usePayment (`hooks/usePayment.tsx`)

Main hook for payment operations and state management.

**Returns:**
```typescript
{
  processPayment: (method: PaymentMethod, amount: number) => Promise<PaymentResult>;
  cancelPayment: () => void;
  paymentStatus: PaymentStatus;
  selectedMethod: PaymentMethod | null;
  setPaymentMethod: (method: PaymentMethod) => void;
  isProcessing: boolean;
  error: PaymentError | null;
}
```

**Usage Example:**
```tsx
const { processPayment, paymentStatus } = usePayment();

const handleCheckout = async () => {
  try {
    const result = await processPayment('paypal', cartTotal);
    if (result.success) {
      navigateToSuccess(result.transactionId);
    }
  } catch (error) {
    showError(error.message);
  }
};
```

## Types

### Payment Types (`types/payment.ts`)

Core type definitions for the payment system.

```typescript
type PaymentMethod = 'paypal' | 'stripe' | 'apple_pay' | 'google_pay' | 'card';

interface PaymentDetails {
  transactionId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  timestamp: Date;
  metadata?: Record<string, any>;
}

enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: PaymentError;
  details?: PaymentDetails;
}
```

## Utilities

### Map Parameters (`utils/mapParameters.ts`)

Transforms internal payment data to provider-specific formats.

**Functions:**
- `mapToPayPalOrder` - Convert cart to PayPal order format
- `mapToStripeIntent` - Convert to Stripe payment intent
- `mapPaymentResponse` - Normalize provider responses

**Example:**
```typescript
const paypalOrder = mapToPayPalOrder({
  items: cartItems,
  shipping: shippingDetails,
  total: calculateTotal(cartItems)
});
```

### Payment Methods (`utils/paymentMethods.ts`)

Configuration and metadata for supported payment methods.

```typescript
export const PAYMENT_METHODS = {
  paypal: {
    id: 'paypal',
    name: 'PayPal',
    icon: PayPalIcon,
    supported: ['web', 'ios', 'android'],
    currencies: ['USD', 'EUR', 'GBP', ...],
    fees: 0.029, // 2.9%
  },
  stripe: {
    id: 'stripe',
    name: 'Credit/Debit Card',
    icon: CardIcon,
    supported: ['web', 'ios', 'android'],
    currencies: ['USD', 'EUR', ...],
    fees: 0.029,
  },
  // ... other methods
};
```

### Map Payment Icon (`utils/mapPaymentIcon.tsx`)

Returns appropriate icon component for payment method.

```typescript
const icon = mapPaymentIcon('paypal'); // Returns PayPalIcon component
```

## Integration Flow

### 1. Checkout Initiation
```tsx
// In checkout component
const { selectedMethod, setSelectedMethod } = usePaymentContext();

return (
  <PaymentMethodSelector
    onSelect={setSelectedMethod}
    availableMethods={getAvailablePaymentMethods()}
  />
);
```

### 2. Payment Processing
```tsx
// In payment form
const handlePayment = async () => {
  const paymentData = {
    amount: cartTotal,
    items: cartItems,
    shipping: shippingAddress,
    billing: billingAddress
  };

  try {
    const result = await processPayment(selectedMethod, paymentData);
    if (result.success) {
      await createOrder(result.transactionId);
      navigateToSuccess();
    }
  } catch (error) {
    handlePaymentError(error);
  }
};
```

### 3. Success Handling
```tsx
// In success handler
const handlePaymentSuccess = async (details: PaymentDetails) => {
  // Update order status
  await updateOrderPaymentStatus(orderId, details.transactionId);
  
  // Clear cart
  await clearCart();
  
  // Show success message
  showSuccessNotification('Payment completed successfully!');
  
  // Navigate to order confirmation
  navigate(`/order/confirmation/${orderId}`);
};
```

## Provider-Specific Implementation

### PayPal Integration

**Setup:**
1. Configure PayPal client ID in environment
2. Load PayPal SDK in PaymentProviders
3. Initialize PayPal buttons with configuration

**Configuration:**
```typescript
const paypalConfig = {
  clientId: process.env.PAYPAL_CLIENT_ID,
  currency: 'USD',
  intent: 'capture',
  components: 'buttons,card-fields',
};
```

**Order Creation:**
```typescript
createOrder: async (data, actions) => {
  return actions.order.create({
    purchase_units: [{
      amount: {
        value: amount.toString(),
        currency_code: currency
      },
      description: 'Olas International Order'
    }]
  });
}
```

### Future Providers

#### Stripe (Planned)
- Stripe Elements integration
- Payment Intent API
- 3D Secure handling
- Subscription support

#### Apple Pay (Planned)
- Apple Pay JS for web
- Native Apple Pay for iOS
- Wallet integration

#### Google Pay (Planned)
- Google Pay API integration
- One-tap checkout
- Saved payment methods

## Security Considerations

### PCI Compliance
- No direct card handling
- Hosted fields for card input
- Tokenization for card storage
- SSL/TLS encryption required

### Payment Data Protection
- No sensitive data in Redux state
- Server-side payment validation
- Idempotency keys for retries
- Rate limiting on payment endpoints

### Error Handling
- Never expose internal errors
- Log errors securely
- User-friendly error messages
- Automatic retry for transient failures

## Testing

### Unit Tests
```typescript
describe('PaymentProvider', () => {
  it('should select payment method', () => {
    const { result } = renderHook(() => usePaymentContext());
    act(() => {
      result.current.setSelectedMethod('paypal');
    });
    expect(result.current.selectedMethod).toBe('paypal');
  });
});
```

### Integration Tests
- Mock payment provider SDKs
- Test payment flow end-to-end
- Test error scenarios
- Test cancellation handling

### Manual Testing Checklist
- [ ] Payment method selection
- [ ] Amount calculation
- [ ] Success flow
- [ ] Error handling
- [ ] Cancellation flow
- [ ] Mobile responsiveness
- [ ] Multiple currencies

## Common Issues & Solutions

### SDK Loading
**Problem:** PayPal SDK fails to load
**Solution:** Check network, verify client ID, handle loading timeout

### Payment Failures
**Problem:** Payment processed but order not created
**Solution:** Implement idempotency, verify webhook handling

### Mobile Integration
**Problem:** Payment sheet not appearing on mobile
**Solution:** Check platform-specific implementation, verify deep linking

## Best Practices

### 1. Always Validate Server-Side
```typescript
// Never trust client-side amount
const verifiedAmount = await calculateOrderTotal(orderId);
if (verifiedAmount !== clientAmount) {
  throw new PaymentValidationError('Amount mismatch');
}
```

### 2. Handle All Payment States
```typescript
switch (paymentStatus) {
  case 'completed':
    handleSuccess();
    break;
  case 'pending':
    showPendingMessage();
    pollForUpdate();
    break;
  case 'failed':
    handleFailure();
    offerRetry();
    break;
}
```

### 3. Implement Proper Cleanup
```typescript
useEffect(() => {
  return () => {
    // Cancel any pending payments
    if (isProcessing) {
      cancelPayment();
    }
  };
}, [isProcessing]);
```

## Roadmap

### Phase 1 (Current)
- ✅ Basic payment architecture
- ✅ PayPal button integration
- 🔄 PayPal backend integration
- 🔄 Order creation after payment

### Phase 2
- Stripe integration
- Saved payment methods
- Recurring payments
- Payment method management UI

### Phase 3
- Apple Pay / Google Pay
- Cryptocurrency payments
- Buy now, pay later options
- Multi-currency support

### Phase 4
- Advanced fraud detection
- Payment analytics
- A/B testing framework
- Checkout optimization

## Configuration

### Environment Variables
```env
# PayPal
PAYPAL_CLIENT_ID=your_client_id
PAYPAL_SECRET=your_secret
PAYPAL_WEBHOOK_ID=webhook_id

# Stripe (future)
STRIPE_PUBLIC_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx

# Payment Settings
PAYMENT_TIMEOUT=300000 # 5 minutes
PAYMENT_RETRY_COUNT=3
```

### Feature Flags
```typescript
const FEATURE_FLAGS = {
  ENABLE_PAYPAL: true,
  ENABLE_STRIPE: false,
  ENABLE_APPLE_PAY: false,
  ENABLE_CRYPTO: false,
  ENABLE_SAVED_CARDS: false,
};
```

## Debugging

### Enable Debug Mode
```typescript
// In development
window.__PAYMENT_DEBUG__ = true;

// This will log:
// - Payment method selection
// - SDK initialization
// - API calls
// - Error details
```

### Common Debug Points
1. Check payment provider initialization
2. Verify amount calculations
3. Monitor network requests
4. Check error boundaries
5. Validate server responses