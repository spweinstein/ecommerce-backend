# E-Commerce Backend API

A RESTful API for an e-commerce platform built with Express.js and MongoDB. This backend supports multiple shops, product management, user authentication, shopping cart functionality, and order processing.

## Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Multi-Shop Support**: Platform for multiple shops with industry categorization
- **Product Management**: CRUD operations for products with category organization
- **Shopping Cart**: User cart management with token verification
- **Order Processing**: Checkout and order tracking for both users and shops
- **Protected Routes**: Middleware-based authentication for secure endpoints

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: bcrypt for password hashing
- **Development**: nodemon for hot reloading

## Project Structure

```
├── controllers/        # Request handlers for each resource
├── db/                 # Database connection configuration
├── middleware/         # Authentication middleware (JWT verification)
├── models/             # Mongoose schemas (User, Shop, Product, Cart, Orders)
├── routes/             # API route definitions
├── seed/               # Database seeding scripts
└── server.js           # Application entry point
```

## API Endpoints

- `/auth` - User registration and login
- `/users` - User management
- `/shops` - Shop operations
- `/products` - Product listings and management
- `/industries` - Industry categories for shops
- `/productCategories` - Product categorization
- `/cart` - Shopping cart operations (protected)
- `/orders` - Order management (protected)
- `/checkout` - Checkout process (protected)

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB instance running
- `.env` file with `MONGODB_URI` configured

### Installation

```bash
# Install dependencies
npm install

# Seed the database (optional)
npm run seed

# Start development server
npm run dev

# Start production server
npm start
```

The server runs on port 3000 by default.

## Environment Variables

Create a `.env` file in the root directory:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Development

The project uses ES6 modules (`"type": "module"` in package.json). Use `npm run dev` to start the server with nodemon for automatic restarts during development.

## Future Features

### Planned Enhancements

- **Stock/Inventory Management**: Track product inventory levels and prevent overselling
- **Cart Validations**:
  - Verify product IDs exist when adding/removing items
  - Check for sufficient stock before cart operations
- **Deletion Mechanics**: Implement cascade deletion or prevention logic for products, shops, categories, and industries to avoid orphaned records
- **Shop Order Status Updates**: Endpoint for shop owners to update order status (processing, shipped, delivered, etc.)
- **Enhanced Checkout Validation**:
  - Verify sufficient stock availability at checkout
  - Detect and notify users of price changes since items were added to cart
  - Real-time stock reservation during checkout process
- **Improved Error Handling**: Pass validation and server errors through to frontend UI for better user feedback
- **Payment Integration**: Connect with stripe for secure payment gateway
- **Search & Filtering**: Advanced product search with filters (price range, category, brand, ratings)
- **Email Notifications**: Automated emails for order confirmations, shipping updates, and password resets
- **Image Upload**: Support for uploading product images directly to cloud storage
- **Discount/Coupon System**: Promotional codes and discount management
