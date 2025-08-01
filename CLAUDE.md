# Olas International Expo - Project Documentation

## Project Overview

Olas International is a modular e-commerce platform built with React Native Expo, designed to support multiple services including marketplace, travel bookings, and rentals. The application is built for web, iOS, and Android platforms with a focus on reusability and extensibility.

## Tech Stack

- **Framework**: React Native with Expo SDK 52
- **Language**: TypeScript
- **Navigation**: Expo Router v4 (file-based routing)
- **State Management**: Redux Toolkit with RTK Query
- **UI Framework**: React Native Paper
- **Forms**: Formik with Yup validation
- **Internationalization**: i18next (EN, ES, FR, PT)
- **Payment**: PayPal React SDK (integration in progress)
- **Authentication**: JWT-based with refresh tokens

## Architecture Overview

### Modular Design

The application follows a modular architecture with three main feature modules:

1. **Auth Module** (`/modules/auth/`): Handles all authentication-related functionality
2. **Marketplace Module** (`/modules/marketplace/`): E-commerce features including products, cart, and orders
3. **Payment Module** (`/modules/payment/`): Payment processing (currently implementing PayPal)

### Key Design Principles

- **Reusability**: Core components like ShoppingCart are type-generic and can be reused across different product types
- **Extensibility**: Shopping cart actions can be extended via custom hooks
- **Separation of Concerns**: Clear separation between UI, business logic, and API layers
- **Type Safety**: Comprehensive TypeScript types and interfaces

## Module Details

### Auth Module (`/modules/auth/`)

Handles user authentication and profile management:

- **Components**:
  - `OtpInput`: OTP verification input
  - `UpdateProfileForm`: User profile editing
  - `ProfileSideMenu`: Navigation menu for profile section
- **Services**: `AccountService` - RTK Query API for user operations
- **State**: `authSlice` - Redux slice with auth state and thunks
- **Features**:
  - JWT authentication with refresh tokens
  - OTP verification for registration
  - Password reset flow
  - Profile management

### Marketplace Module (`/modules/marketplace/`)

Core e-commerce functionality:

- **Shopping Cart System**:
  - `ShoppingCartContext`: Generic context provider for cart management
  - `ShoppingCartReducer`: Pure reducer for cart state management
  - `useMarketCartActions`: Hook extending cart functionality for marketplace
  
- **Components**:
  - Product listings and search
  - Cart overlay with item management
  - Order history and details
  - Payment status indicators

- **Key Features**:
  - Generic cart system supporting any product type with `id` property
  - Real-time cart synchronization with backend
  - Order management with payment status tracking
  - Responsive product catalog with filtering

### Payment Module (`/modules/payment/`)

Payment processing (under development):

- **Providers**: `PaymentProvider` - Manages payment method selection
- **Components**:
  - `PayPalButton`: PayPal checkout integration
  - `GenericCheckoutButton`: Extensible checkout component
- **Status**: Currently implementing PayPal integration with backend

## Shopping Cart Architecture

The shopping cart is designed to be completely reusable across different service types:

### Core Components

1. **ShoppingCartContext** (`/modules/marketplace/context/ShoppingCartContext.tsx`)
   - Generic context supporting any product type
   - Manages cart visibility and state
   - Integrates with payment overlay

2. **ShoppingCartReducer** (`/modules/marketplace/reducers/ShoppingCartReducer.tsx`)
   - Pure reducer with standard cart actions
   - Type-safe with generic constraints
   - Actions: SET_CART, ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, CLEAR_CART

3. **Custom Actions Hook** (`/modules/marketplace/hooks/useMarketCartActions.tsx`)
   - Extends base cart functionality
   - Handles API synchronization
   - Provides product-specific rendering

### Usage Pattern

```typescript
// Define your product type
interface TravelProduct {
  id: number;
  name: string;
  // ... other properties
}

// Create custom actions hook
const useTravelCartActions = () => {
  // Implement API calls and custom logic
  return {
    addToCart,
    removeFromCart,
    updateQuantity,
    renderItem,
    // ... other actions
  };
};

// Use in your component
<ShoppingCartProvider 
  actions={useTravelCartActions()}
  renderPaymentForm={(onClose) => <TravelPaymentForm onClose={onClose} />}
>
  {/* Your app content */}
</ShoppingCartProvider>
```

## State Management

### Redux Store Structure

- **Auth Slice**: User authentication state with AsyncStorage persistence
- **API Services**:
  - `accountService`: User account operations
  - `bookingService`: Products, cart, and orders
  - `geoService`: Location and destination management
- **Main Layout Reducer**: UI state management

### Context Providers

- **AppContext**: Root context wrapping all providers
- **LocationContext**: Manages active destination
- **MainLayoutContext**: UI state (modals, navigation)

## Routing Structure

Using Expo Router file-based routing:

```
app/
   (auth)/           # Authentication routes
      login
      register
      verify
      reset-password
   (main)/           # Main app with tabs
      (tabs)/
         explore   # Home/marketplace
         profile   # User profile
         settings  # App settings
      services/
          [service] # Dynamic service routes
   promos/           # Promotional pages
```

## API Integration

- **Base URL**: Configured via environment variables
- **Authentication**: Bearer token in headers
- **Token Refresh**: Automatic refresh on 401/403 responses
- **Error Handling**: Centralized error handling with retry logic

## UI/UX Patterns

- **Responsive Design**: Platform-specific components (`.web.tsx` files)
- **Theme**: React Native Paper with custom theme
- **Icons**: Custom SVG icon system
- **Forms**: Formik with Yup validation schemas
- **Toasts**: Global toast notifications

## Development Guidelines

### Adding New Services

1. Create a new module in `/modules/[service-name]/`
2. Implement service-specific cart actions hook
3. Define product types and API services
4. Create payment form component
5. Add routes in `/app/(main)/services/`

### Code Style

- Use TypeScript for all new code
- Follow existing patterns for consistency
- Implement proper error handling
- Add loading states for async operations
- Ensure responsive design for all platforms

### Testing

- Unit tests with Jest
- Component testing with React Native Testing Library
- Manual testing on web, iOS, and Android

## Environment Configuration

Key environment variables:
- `API_URL`: Backend API endpoint
- `DOMAIN`: Application domain
- Payment gateway credentials (configured per environment)

## Build and Deployment

- **Web**: `npm run build:web`
- **Android**: EAS Build configured
- **iOS**: EAS Build configured
- **Development**: `npm start` (port 3000)

## Future Roadmap

1. **Travel Service**: Booking system for travel packages
2. **Rental Service**: Property and equipment rentals
3. **Enhanced Payment**: Multiple payment gateway support
4. **Offline Support**: Local data caching
5. **Push Notifications**: Order and payment updates

## Important Notes

- The shopping cart system is designed to be service-agnostic
- Payment module is under active development
- All text should support i18n
- Follow responsive design principles for all new features
- Maintain type safety throughout the codebase