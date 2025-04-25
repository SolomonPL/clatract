# Clatract

Clatract is an AI-powered SaaS application that helps freelancers and service-based businesses create clear offers and instantly generate professional service agreements.

**Tagline**: "Get Clear on What You Sell. Get Paid with Confidence."

## Features

- **Offer Clarity**: AI generates clear one-liners and elevator pitches for your services
- **Contract Generator**: Create legally sound service agreements in seconds
- **PDF Export**: Download professional contracts as PDF documents
- **User Dashboard**: Manage all your offers and contracts in one place

## Project Structure

This project is split into two main parts:

- `client`: React frontend built with Vite, TypeScript, and Tailwind CSS
- `server`: Express backend API with OpenAI integration

## Prerequisites

- Node.js (v16+)
- npm or yarn
- OpenAI API key
- MongoDB (optional for full functionality)

## Getting Started

### Environment Setup

1. Clone the repository
2. Create environment files:

For the server:
```bash
cd server
cp src/.env.example .env
# Edit .env with your API keys and settings
```

### Client Setup

```bash
cd client
npm install
npm run dev
```

The frontend will be available at http://localhost:5173

### Server Setup

```bash
cd server
npm install
npm run dev
```

The backend API will be available at http://localhost:5000

## API Endpoints

The backend provides the following API endpoints:

### Offers
- `POST /api/offers/generate`: Generate offer clarity (one-liner, elevator pitch)

### Contracts
- `POST /api/contracts/generate`: Generate a contract
- `GET /api/contracts/:id`: Get contract details
- `GET /api/contracts/:id/export`: Export contract as PDF

### Users
- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Login a user
- `GET /api/users/profile`: Get user profile

### Payments
- `POST /api/payments/create-subscription`: Create a subscription
- `POST /api/payments/webhook`: Handle Stripe webhook events
- `GET /api/payments/subscription/:userId`: Get subscription status

## License

MIT 