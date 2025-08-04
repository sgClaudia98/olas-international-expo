# Auth Module Documentation

## Overview

The Auth Module handles all authentication-related functionality in the Olas International Expo application. It provides a complete authentication flow including login, registration with OTP verification, password reset, and profile management.

## Module Structure

```
modules/auth/
├── components/      # Reusable UI components
├── models/         # Data models and types
├── pages/          # Authentication page components
├── services/       # API services and interfaces
├── slices/         # Redux state management
└── styles/         # Component-specific styles
```

## Core Components

### OtpInput (`components/OtpInput.tsx`)
A custom OTP input component for verification codes during registration.

**Props:**
- `length: number` - Number of OTP digits
- `onOtpSubmit: (otp: string) => void` - Callback when OTP is complete
- `disabled?: boolean` - Disable input fields

**Usage:**
```tsx
<OtpInput 
  length={6} 
  onOtpSubmit={handleVerification} 
  disabled={isVerifying}
/>
```

### UpdateProfileForm (`components/UpdateProfileForm.tsx`)
Form component for editing user profile information.

**Features:**
- Formik integration with Yup validation
- Support for all user profile fields
- Real-time validation
- Loading states during submission

**Helper Functions** (`components/UpdateProfileFormHelper.ts`):
- `getInitialValues()` - Generate form initial values from user data
- `getValidationSchema()` - Returns Yup validation schema
- `formatFormData()` - Transform form data for API submission

### ProfileSideMenu (`components/ProfileSideMenu.tsx`)
Navigation menu for profile-related pages.

**Features:**
- Active route highlighting
- Icon-based navigation items
- Responsive design for mobile/desktop

### Countdown (`components/Countdown.tsx`)
Timer component used for OTP expiration and resend functionality.

**Props:**
- `initialTime: number` - Starting time in seconds
- `onComplete: () => void` - Callback when timer reaches zero
- `format?: string` - Display format for timer

## Pages

### Login (`pages/Login.tsx`)
Main login page with email/password authentication.

**Features:**
- Formik form with validation
- Remember me functionality
- Links to register and forgot password
- Error handling with toast notifications
- Automatic redirect after successful login

### Register (`pages/Register.tsx`)
User registration page with complete signup flow.

**Features:**
- Multi-field registration form
- Email validation
- Password strength requirements
- Automatic OTP sending on submission
- Navigation to verification page

### Verify (`pages/Verify.tsx`)
OTP verification page for new registrations.

**Features:**
- 6-digit OTP input
- Countdown timer for OTP expiration
- Resend OTP functionality
- Auto-navigation after verification

### ForgotPassword (`pages/ForgotPassword.tsx`)
Password reset request page.

**Features:**
- Email input for reset link
- Success/error messaging
- Navigation back to login

### Profile (`pages/Profile.tsx`)
User profile management page.

**Features:**
- Display current user information
- Edit profile functionality
- Profile picture upload (planned)
- Account settings

## State Management

### Auth Slice (`slices/authSlice.tsx`)
Redux slice managing authentication state.

**State Shape:**
```typescript
{
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  registerData: RegisterData | null;
}
```

**Key Actions:**
- `setUser` - Set authenticated user
- `setTokens` - Update auth tokens
- `logout` - Clear auth state
- `setRegisterData` - Store registration data for verification
- `clearError` - Clear error messages

### Auth Thunks (`slices/authThunks.ts`)
Async thunk actions for authentication operations.

**Thunks:**
- `loginUser` - Handle user login
- `registerUser` - Handle user registration
- `verifyOtp` - Verify OTP code
- `refreshTokenThunk` - Refresh JWT tokens
- `logoutUser` - Handle logout with cleanup

## Services

### Account Service (`services/api/AccountService.ts`)
RTK Query service for user account operations.

**Endpoints:**
- `getClients` - Fetch user list (admin)
- `getClient` - Get single user details
- `saveClient` - Create new user
- `updateClient` - Update user profile
- `deleteClient` - Delete user account
- `forgotPassword` - Request password reset
- `resetPassword` - Confirm password reset
- `verifyAccount` - Verify account with OTP

### Interfaces (`services/interfaces/account.ts`)
TypeScript interfaces for account-related data.

**Key Interfaces:**
```typescript
interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: Address;
  // ... other fields
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends User {
  password: string;
  confirmPassword: string;
}
```

## Models

### Client Model (`models/ClientModel.ts`)
Data model representing a user/client in the system.

**Properties:**
- User identification (id, email)
- Personal information (name, phone)
- Address details
- Account metadata (created date, status)

## Styles

### Auth Pages Styles (`styles/authPages.ts`)
Shared styles for authentication pages.

**Style Groups:**
- Form containers
- Input field styles
- Button variants
- Error/success messages
- Layout utilities

### Profile Styles (`styles/profile.ts`)
Styles specific to profile pages.

**Style Groups:**
- Profile layout
- Avatar/image styles
- Information display
- Edit form styles

## Authentication Flow

### Registration Flow
1. User fills registration form
2. Form validation with Yup schema
3. API call to create account
4. OTP sent to user email
5. Redirect to verification page
6. User enters OTP
7. Account verified and activated
8. Automatic login and redirect

### Login Flow
1. User enters credentials
2. Form validation
3. API authentication request
4. Receive JWT tokens
5. Store tokens in Redux and AsyncStorage
6. Update user state
7. Redirect to main app

### Token Management
- Access token stored in Redux state
- Refresh token stored in AsyncStorage
- Automatic refresh on 401/403 responses
- Token expiration handling
- Logout on refresh failure

## Security Considerations

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

### Token Security
- Tokens never exposed in URLs
- Secure storage in AsyncStorage
- HTTPS-only transmission
- Short access token lifespan
- Refresh token rotation

### OTP Security
- 6-digit random codes
- 10-minute expiration
- Rate limiting on resend
- Single-use codes

## Integration Points

### With Main App
- `AppContext` wraps auth provider
- Protected routes check auth state
- Header displays user info
- Logout available globally

### With API
- Bearer token in Authorization header
- Automatic token refresh
- Error handling for auth failures
- User data synchronization

### With Other Modules
- Marketplace uses user data for orders
- Payment module requires authenticated user
- Profile data available via Redux

## Common Patterns

### Form Handling
```tsx
const formik = useFormik({
  initialValues: getInitialValues(user),
  validationSchema: getValidationSchema(),
  onSubmit: async (values) => {
    try {
      await updateProfile(values);
      showToast('Profile updated successfully');
    } catch (error) {
      showToast('Update failed', 'error');
    }
  }
});
```

### Protected Components
```tsx
const ProtectedComponent = () => {
  const { isAuthenticated } = useSelector(selectAuth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <YourComponent />;
};
```

### API Error Handling
```tsx
try {
  const result = await login(credentials).unwrap();
  // Handle success
} catch (error) {
  if (error.status === 401) {
    showToast('Invalid credentials');
  } else {
    showToast('An error occurred');
  }
}
```

## Testing Considerations

### Unit Tests
- Test auth reducers with different actions
- Test form validation schemas
- Test helper functions
- Mock API responses

### Integration Tests
- Test complete auth flows
- Test token refresh mechanism
- Test protected route behavior
- Test error scenarios

### E2E Tests
- Test registration flow
- Test login/logout
- Test password reset
- Test profile updates

## Future Enhancements

1. **Social Authentication**
   - OAuth integration (Google, Facebook)
   - Apple Sign In for iOS
   - Social profile import

2. **Enhanced Security**
   - Two-factor authentication
   - Biometric authentication
   - Device management

3. **Profile Features**
   - Profile picture upload
   - Email verification
   - Account deletion

4. **UX Improvements**
   - Password strength meter
   - Remember device option
   - Session management UI