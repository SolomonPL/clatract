# Deploying Clatract to Vercel

This guide explains how to deploy the Clatract application (both frontend and backend) to Vercel.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. [Node.js](https://nodejs.org) installed (v16+ recommended)
3. [Vercel CLI](https://vercel.com/docs/cli) installed globally: `npm i -g vercel`
4. OpenAI API key
5. Stripe account with API keys (if using payment features)

## Pre-deployment Steps

1. Clone the repository:
   ```
   git clone <repository-url>
   cd clatract
   ```

2. Install dependencies:
   ```
   npm run install:all
   ```

3. Create your environment variables:
   - Copy `.env.example` to `.env` in the server directory
   - Fill in your API keys and secrets:
     ```
     PORT=3000
     NODE_ENV=production
     JWT_SECRET=your_jwt_secret
     OPENAI_API_KEY=your_openai_api_key
     STRIPE_SECRET_KEY=your_stripe_secret_key
     STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
     CLIENT_URL=https://your-vercel-app.vercel.app
     ```

4. Build the application:
   ```
   npm run build
   ```
   This will build both the client and server.

## Deploying to Vercel

### Method 1: Using Vercel CLI

1. Login to Vercel:
   ```
   vercel login
   ```

2. Deploy the application:
   ```
   vercel
   ```

3. Follow the prompts to configure your project.

4. Set up your environment variables in the Vercel dashboard:
   - Go to your project on Vercel
   - Navigate to Settings > Environment Variables
   - Add all variables from your `.env` file

### Method 2: Using GitHub Integration

1. Push your code to a GitHub repository:
   ```
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. Import your GitHub repository in the Vercel dashboard:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your repository
   - Configure your project settings (Framework preset: Other)
   - Set your environment variables
   - Deploy

## Post-deployment

1. Once deployed, update your client's environment variable `CLIENT_URL` to match your Vercel deployment URL.

2. Configure Stripe webhook endpoint:
   - Go to your Stripe Dashboard > Developers > Webhooks
   - Add an endpoint with your Vercel URL: `https://your-vercel-app.vercel.app/api/payments/webhook`
   - Update the `STRIPE_WEBHOOK_SECRET` in your Vercel environment variables

## Testing the Deployment

1. Visit your deployed application URL
2. Test the API endpoint at `https://your-vercel-app.vercel.app/api`
3. Test user registration and login
4. Test offer generation and contract features

## Troubleshooting

- **CORS issues**: Ensure the `CLIENT_URL` in your environment variables matches your Vercel deployment URL
- **API endpoints not working**: Check that the routes in `vercel.json` are correct
- **OpenAI API errors**: Ensure your API key is valid and has sufficient credits
- **Build errors**: Check the build logs in the Vercel dashboard for specific errors 