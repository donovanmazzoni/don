# WooCommerce Order Management Tool - Setup Guide

## Overview

This is a comprehensive order management system for WooCommerce built with React, TypeScript, and Vite. It provides a complete dashboard for managing orders, products, users, and viewing analytics.

## Features

### 1. Analytics Dashboard
- **Revenue Metrics**: Total revenue, average order value, and trends
- **Order Statistics**: Total orders, items sold, order status distribution
- **Product Insights**: Total products, stock levels, inventory value
- **Customer Analytics**: Total customers, paying customers, lifetime value
- **Visual Charts**: Pie charts for order status, bar charts for stock levels and top sellers
- **Recent Orders**: Quick view of the latest 5 orders

### 2. Order Management
- **List View**: All orders with filtering and search capabilities
- **Filter by Status**: Pending, processing, on-hold, completed, cancelled, refunded, failed
- **Search**: By order number, customer name, or email
- **Detail View**: Click any order to see:
  - Complete order items with quantities and prices
  - Billing and shipping addresses
  - Payment information
  - Order totals with tax and shipping breakdown
  - Customer notes
  - Status updates (change order status directly)

### 3. Product Management
- **Comprehensive List**: All products with detailed information
- **Product Statistics**: Quick overview of total products, stock levels, virtual products
- **Search & Filter**: Search by name or SKU, filter by status and stock level
- **Product Details**:
  - Product images
  - SKU, type, and price information
  - Stock management status
  - Virtual/downloadable badges
  - Shipping requirements
  - Total sales count

### 4. User Management
- **User List**: All customers with detailed information
- **User Statistics**: Total users, paying customers, total orders, total spent
- **Create Users**: Add new users with role assignment
- **Role Management**:
  - Administrator (full access)
  - Shop Manager (manage products, orders, customers)
  - Customer (place orders, manage account)
  - Subscriber (manage profile only)
- **Delete Users**: Remove users with confirmation
- **User Details**: Avatar, orders count, total spent, registration date

## Installation

### Prerequisites
- Node.js 18+ and npm
- A WooCommerce store with REST API enabled
- WooCommerce API credentials (Consumer Key and Consumer Secret)

### Steps

1. **Install dependencies**:
```bash
npm install
```

2. **Configure WooCommerce API**:

Create a `.env` file in the root directory:

```env
VITE_WOOCOMMERCE_URL=https://your-store.com
VITE_WOOCOMMERCE_CONSUMER_KEY=ck_xxxxxxxxxxxxxxxxxxxxx
VITE_WOOCOMMERCE_CONSUMER_SECRET=cs_xxxxxxxxxxxxxxxxxxxxx
```

**How to get API credentials:**
1. Log into your WooCommerce admin panel
2. Go to WooCommerce > Settings > Advanced > REST API
3. Click "Add key"
4. Give it a description (e.g., "Order Management Tool")
5. Select "Read/Write" permissions
6. Click "Generate API key"
7. Copy the Consumer Key and Consumer Secret to your `.env` file

3. **Run the development server**:
```bash
npm run dev
```

The application will open at `http://localhost:5173`

4. **Build for production**:
```bash
npm run build
```

The built files will be in the `dist/` directory.

## Usage

### Navigation
- Use the sidebar to navigate between Dashboard, Orders, Products, and Users
- On mobile, tap the menu icon to open the sidebar

### Dashboard
- View real-time KPIs and analytics
- All data is fetched from your WooCommerce store via the API
- Charts update automatically based on current data

### Managing Orders
1. Click "Orders" in the sidebar
2. Use the search bar to find specific orders
3. Filter by status using the dropdown
4. Click "View" to see order details
5. In the detail view, you can change the order status

### Managing Products
1. Click "Products" in the sidebar
2. View all products with their stock levels, types, and prices
3. Use search to find products by name or SKU
4. Filter by status (published, draft, etc.) or stock status
5. See virtual/downloadable products with special badges

### Managing Users
1. Click "Users" in the sidebar
2. View all users with their order history and spending
3. Click "Create User" to add a new user
4. Select the appropriate role for the user
5. Click the trash icon to delete a user (with confirmation)

## API Integration

This application uses the WooCommerce REST API v3. The following endpoints are used:

- **Orders**: `GET /wp-json/wc/v3/orders`
- **Products**: `GET /wp-json/wc/v3/products`
- **Customers**: `GET /wp-json/wc/v3/customers`
- **Reports**: `GET /wp-json/wc/v3/reports/sales`, `GET /wp-json/wc/v3/reports/top_sellers`

All API calls include authentication using the Consumer Key and Secret.

## Technology Stack

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **React Router**: Client-side routing
- **Tailwind CSS**: Styling
- **Recharts**: Data visualization
- **Axios**: HTTP client
- **Lucide React**: Icons

## Troubleshooting

### API Connection Issues

If you see errors loading data:

1. Verify your `.env` file has the correct credentials
2. Ensure your WooCommerce store has SSL (HTTPS)
3. Check that the WooCommerce REST API is enabled
4. Verify the API credentials have Read/Write permissions
5. Check your browser console for specific error messages

### CORS Issues

If you encounter CORS errors:

1. Make sure your WooCommerce store allows API requests from your domain
2. Consider using a proxy or deploying the app on the same domain as your store
3. Check WooCommerce > Settings > Advanced > REST API settings

### Build Issues

If the build fails:

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Ensure you're using Node.js 18 or higher

## Development

### Project Structure

```
don/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── Dashboard.tsx   # Analytics dashboard
│   │   ├── Orders.tsx      # Order management
│   │   ├── Products.tsx    # Product management
│   │   ├── Users.tsx       # User management
│   │   └── Layout.tsx      # Main layout with navigation
│   ├── lib/                # Utility functions
│   ├── services/           # API services
│   ├── types/              # TypeScript types
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite config
└── tailwind.config.js      # Tailwind config
```

### Adding New Features

1. Create new components in `src/components/`
2. Add new API methods in `src/services/woocommerce.ts`
3. Define TypeScript types in `src/types/woocommerce.ts`
4. Add routes in `src/App.tsx`
5. Update navigation in `src/components/Layout.tsx`

## License

This project is provided as-is for managing WooCommerce stores.
