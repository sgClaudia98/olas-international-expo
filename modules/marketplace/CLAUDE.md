# Marketplace Module Documentation

## Overview

The Marketplace Module is the core e-commerce functionality of Olas International Expo. It provides a complete shopping experience including product browsing, search, filtering, cart management, and order processing. The module is designed with reusability in mind, featuring a generic shopping cart system that can be adapted for different product types.

## Module Structure

```
modules/marketplace/
├── components/     # UI components organized by feature
│   ├── banners/   # Promotional banner components
│   ├── cart/      # Shopping cart UI
│   ├── filter/    # Product filtering
│   ├── landing/   # Homepage components
│   ├── orders/    # Order management UI
│   ├── payment/   # Checkout flow components
│   ├── product/   # Product display components
│   └── skeletons/ # Loading states
├── context/       # React contexts
├── data/          # Static data and constants
├── hooks/         # Custom React hooks
├── layout/        # Layout components
├── pages/         # Page-level components
├── reducers/      # Redux-style reducers
├── services/      # API services
├── slices/        # Redux slices
├── styles/        # Component styles
└── utils/         # Utility functions
```

## Core Architecture

### Generic Shopping Cart System

The shopping cart is built as a reusable, type-generic system that can work with any product type.

#### ShoppingCartContext (`context/ShoppingCartContext.tsx`)

Generic context provider managing cart state and UI.

**Key Features:**
- Type-generic design: `ShoppingCartProvider<T extends { id: number }>`
- Pluggable actions system via custom hooks
- Integrated payment overlay management
- Cart visibility state management

**Props:**
```typescript
interface ShoppingCartProviderProps<T> {
  children: React.ReactNode;
  actions: ShoppingCartActions<T>;
  renderPaymentForm?: (onClose: () => void) => React.ReactNode;
}
```

**Usage Example:**
```tsx
<ShoppingCartProvider 
  actions={useMarketCartActions()}
  renderPaymentForm={(onClose) => <PaymentForm onClose={onClose} />}
>
  <App />
</ShoppingCartProvider>
```

#### ShoppingCartReducer (`reducers/ShoppingCartReducer.tsx`)

Pure reducer managing cart state transformations.

**Actions:**
- `SET_CART` - Initialize cart with items
- `ADD_TO_CART` - Add new item or increase quantity
- `REMOVE_FROM_CART` - Remove item completely
- `UPDATE_QUANTITY` - Change item quantity
- `CLEAR_CART` - Empty the cart

**State Shape:**
```typescript
interface CartState<T> {
  items: CartItem<T>[];
  total: number;
  itemCount: number;
}
```

#### useMarketCartActions (`hooks/useMarketCartActions.tsx`)

Marketplace-specific implementation of cart actions.

**Features:**
- API synchronization with backend
- Product-specific rendering logic
- Error handling with toast notifications
- Loading states during operations

**Provided Actions:**
```typescript
{
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loadCart: () => Promise<void>;
  renderItem: (item: CartItem<Product>) => React.ReactNode;
}
```

## Components

### Product Components

#### ProductItem (`components/product/ProductItem.tsx`)
Main product card component for listings.

**Features:**
- Responsive design
- Add to cart functionality
- Price display with currency
- Product image with fallback
- Click to view details

#### ProductInfo (`components/product/ProductInfo.tsx`)
Detailed product information display.

**Features:**
- Full product description
- Image gallery
- Size/variant selection
- Quantity selector
- Add to cart with options

#### ProductItemLittle (`components/product/ProductItemLittle.tsx`)
Compact product display for cart and order summaries.

### Cart Components

#### CartOverlay (`components/cart/CartOverlay.tsx`)
Slide-out cart panel.

**Features:**
- Real-time cart updates
- Item quantity management
- Remove item functionality
- Subtotal calculation
- Proceed to checkout

#### PaymentOverlay (`components/cart/PaymentOverlay.tsx`)
Payment form container sliding over cart.

**Features:**
- Smooth transition from cart
- Close on escape or backdrop click
- Mobile-responsive design

### Filter Components

#### Filter (`components/filter/Filter.tsx`)
Main filtering interface.

**Features:**
- Category selection
- Price range slider
- Sort options
- Brand filters
- Clear all filters

#### FilterDrawer (`components/filter/FilterDrawer.tsx`)
Mobile-friendly filter drawer.

### Landing Page Components

#### BannerSlider (`components/banners/BannerSlider.tsx`)
Hero banner carousel.

**Features:**
- Auto-rotation
- Touch/swipe support
- Indicator dots
- Responsive images

#### Categories (`components/landing/Categories.tsx`)
Category grid display.

**Features:**
- Icon-based categories
- Hover effects
- Navigation to filtered products

#### BestProducts (`components/landing/BestProducts.tsx`)
Featured products section.

#### PopularBrands (`components/landing/PopularBrands.tsx`)
Brand showcase carousel.

### Order Components

#### OrdersTable (`components/orders/OrdersTable.tsx`)
Order history display.

**Features:**
- Sortable columns
- Status indicators
- View order details
- Payment status

#### OrdersStatus (`components/orders/OrdersStatus.tsx`)
Visual order status indicators.

**Status Types:**
- Pending
- Processing
- Shipped
- Delivered
- Cancelled

#### OrderPayForm (`components/orders/OrderPayForm.tsx`)
Form for paying pending orders.

### Payment Components

#### PaymentForm (`components/payment/PaymentForm.tsx`)
Multi-step checkout form.

**Steps:**
1. Shipping Information
2. Payment Method
3. Review Order
4. Confirmation

#### StepProgress (`components/payment/StepProgress.tsx`)
Visual checkout progress indicator.

#### PaymentWrapper (`components/payment/PaymentWrapper.tsx`)
Container managing payment flow state.

## Hooks

### useMarketCartActions
Extends generic cart with marketplace-specific functionality.

### useBanner (`hooks/useBanner.ts`)
Manages banner data and rotation.

**Returns:**
```typescript
{
  banners: Banner[];
  currentBanner: number;
  nextBanner: () => void;
  prevBanner: () => void;
}
```

### useSearchMarketOptions (`hooks/useSearchMarketOptions.tsx`)
Provides search suggestions and autocomplete.

**Features:**
- Debounced search
- Category suggestions
- Recent searches
- Popular searches

### useSort (`hooks/useSort.ts`)
Product sorting logic.

**Sort Options:**
- Price: Low to High
- Price: High to Low
- Newest First
- Best Sellers
- Rating

## Context Providers

### SearchContext (`context/SearchContext.tsx`)
Global search state management.

**Provides:**
- Search query
- Active filters
- Search results
- Search history

## Services

### BookingService (`services/api/BookingService.ts`)
RTK Query service for marketplace operations.

**Endpoints:**

#### Products
- `getProductAll` - Fetch all products with filtering
- `getProduct` - Get single product details
- `searchProducts` - Search products by query

#### Cart
- `getCart` - Fetch user's cart
- `addToCart` - Add item to cart
- `updateCartItem` - Update item quantity
- `removeFromCart` - Remove item
- `clearCart` - Empty cart

#### Orders
- `getOrders` - Fetch user orders
- `getOrder` - Get order details
- `createOrder` - Place new order
- `updateOrderStatus` - Update order status

#### Categories & Filters
- `getCategories` - Fetch all categories
- `getBrands` - Fetch all brands
- `getFilters` - Get available filters

### Interfaces

#### Product Interface (`services/interfaces/booking.ts`)
```typescript
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: Category;
  brand?: Brand;
  stock: number;
  variants?: ProductVariant[];
}
```

#### Order Interface
```typescript
interface Order {
  id: number;
  orderNumber: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: Date;
}
```

## State Management

### Pending Cart Slice (`slices/pendingCartSlice.tsx`)
Manages items being added to cart.

**Purpose:**
- Track in-progress cart operations
- Prevent duplicate additions
- Show loading states on products

## Pages

### LandingWrapper (`pages/LandingWrapper.tsx`)
Homepage container component.

**Sections:**
- Hero banner
- Featured categories
- Best selling products
- Brand showcase
- Newsletter signup

### ProductsWrapper (`pages/ProductsWrapper.tsx`)
Product listing page.

**Features:**
- Grid/list view toggle
- Filtering sidebar
- Sorting dropdown
- Pagination
- Loading skeletons

### ProductDetail (`pages/ProductDetail.tsx`)
Individual product page.

**Features:**
- Image gallery
- Product information
- Related products
- Reviews (planned)
- Add to cart with options

### OrderHistory (`pages/OrderHistory.tsx`)
User's order list.

**Features:**
- Order filtering
- Status filtering
- Date range selection
- Export functionality

### OrderDetail (`pages/OrderDetail.tsx`)
Single order view.

**Features:**
- Order summary
- Item details
- Shipping information
- Payment details
- Status timeline

## Utilities

### Data Mapping (`utils/dataMapping.tsx`)
Functions for transforming API data to UI format.

**Functions:**
- `mapProductToCartItem` - Convert product to cart item
- `mapOrderToDisplay` - Format order for display
- `calculateCartTotals` - Compute cart summary

### Breadcrumb Builder (`utils/breadcrumbBuild.ts`)
Generate breadcrumb navigation.

**Example:**
```typescript
buildBreadcrumbs('/products/electronics/phones/iphone-12')
// Returns: [
//   { label: 'Home', path: '/' },
//   { label: 'Electronics', path: '/products/electronics' },
//   { label: 'Phones', path: '/products/electronics/phones' },
//   { label: 'iPhone 12', path: '/products/electronics/phones/iphone-12' }
// ]
```

### Status Translation (`utils/statusTranslationMapping.ts`)
Map order statuses to display text.

## Styling System

### Responsive Design
All components use platform-specific styles:
- Mobile-first approach
- Tablet breakpoints
- Desktop optimizations

### Theme Integration
- React Native Paper theme
- Custom color palette
- Consistent spacing
- Typography scale

## Integration with Other Modules

### Auth Module
- User authentication for cart
- Protected checkout flow
- Order history access

### Payment Module
- Payment method selection
- Payment processing
- Order confirmation

## Usage Patterns

### Adding Products to Cart
```tsx
const { addToCart } = useShoppingCart();

const handleAddToCart = async (product: Product) => {
  try {
    await addToCart(product);
    showToast('Added to cart!');
  } catch (error) {
    showToast('Failed to add item');
  }
};
```

### Implementing Custom Cart Actions
```tsx
const useCustomCartActions = (): ShoppingCartActions<CustomProduct> => {
  return {
    addToCart: async (product) => {
      // Custom add logic
    },
    renderItem: (item) => (
      <CustomCartItem item={item} />
    ),
    // ... other actions
  };
};
```

### Creating Product Filters
```tsx
const filters = {
  categories: ['electronics', 'clothing'],
  priceRange: { min: 0, max: 1000 },
  brands: ['apple', 'samsung'],
  inStock: true
};

const { data } = useGetProductsQuery(filters);
```

## Performance Optimizations

### Image Optimization
- Lazy loading for product images
- Progressive loading with blur placeholders
- WebP format support
- Responsive image sizes

### Data Caching
- RTK Query caching
- Optimistic updates for cart
- Prefetching for navigation

### Code Splitting
- Dynamic imports for heavy components
- Route-based splitting
- Vendor bundle optimization

## Testing Guidelines

### Component Testing
- Test cart operations
- Test filter interactions
- Test product display
- Mock API responses

### Integration Testing
- Test complete purchase flow
- Test cart persistence
- Test order creation
- Test payment integration

### E2E Testing
- Browse products
- Add to cart
- Complete checkout
- View order history

## Future Enhancements

1. **Advanced Features**
   - Product reviews and ratings
   - Wishlist functionality
   - Product comparisons
   - Recently viewed items

2. **Search Improvements**
   - Elasticsearch integration
   - Visual search
   - Voice search
   - Search filters

3. **Personalization**
   - Recommended products
   - Personalized categories
   - Dynamic pricing
   - Abandoned cart recovery

4. **Social Features**
   - Share products
   - Social login for reviews
   - Referral system
   - Gift cards