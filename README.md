# WooCommerce Order Management Tool

A comprehensive order management system for WooCommerce with analytics, order tracking, user management, and product management.

## Features

- **Analytics Dashboard**: Real-time KPIs including sales, revenue, products sold, and more
- **Order Management**: View all orders with detailed information, filter by status
- **User Management**: Create, delete, and manage users with extensive rights management
- **Product Management**: View all products with stock levels, virtual status, and more

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with your WooCommerce credentials:
```env
VITE_WOOCOMMERCE_URL=https://your-store.com
VITE_WOOCOMMERCE_CONSUMER_KEY=ck_your_consumer_key
VITE_WOOCOMMERCE_CONSUMER_SECRET=cs_your_consumer_secret
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Technology Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Recharts (for analytics)
- WooCommerce REST API

## API Integration

This application uses the WooCommerce REST API v3 to interact with your store. Make sure your WooCommerce store has REST API enabled and you have valid API credentials.
