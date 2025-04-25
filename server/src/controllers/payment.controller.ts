import { Request, Response } from 'express';
import Stripe from 'stripe';

// Initialize Stripe without specifying API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

// Subscription plans
const PLANS = {
  MONTHLY: {
    name: 'Monthly Subscription',
    price: 29,
    priceId: 'price_monthly', // Replace with real Stripe price ID in production
    interval: 'month'
  },
  LIFETIME: {
    name: 'Lifetime Access',
    price: 99,
    priceId: 'price_lifetime', // Replace with real Stripe price ID in production
    interval: 'one-time'
  }
};

/**
 * Create a subscription
 * @param req Request object
 * @param res Response object
 */
export const createSubscription = async (req: Request, res: Response) => {
  try {
    const { userId, planType, email } = req.body;

    if (!userId || !planType || !email) {
      return res.status(400).json({
        success: false,
        message: 'User ID, plan type, and email are required'
      });
    }

    // Get plan details
    const plan = PLANS[planType as keyof typeof PLANS];
    if (!plan) {
      return res.status(400).json({
        success: false,
        message: 'Invalid plan type'
      });
    }

    // Create Stripe customer (or retrieve if exists)
    // For demo purposes, always creating a new customer
    const customer = await stripe.customers.create({
      email,
      metadata: {
        userId
      }
    });

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.priceId,
          quantity: 1
        },
      ],
      mode: plan.interval === 'one-time' ? 'payment' : 'subscription',
      success_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/payment/cancel`,
      metadata: {
        userId,
        planType
      }
    });

    // Return checkout session ID
    return res.status(200).json({
      success: true,
      data: {
        sessionId: session.id,
        url: session.url
      }
    });
  } catch (error: any) {
    console.error('Error creating subscription:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error creating subscription'
    });
  }
};

/**
 * Handle Stripe webhook events
 * @param req Request object
 * @param res Response object
 */
export const handleWebhook = async (req: Request, res: Response) => {
  const signature = req.headers['stripe-signature'] as string;

  if (!signature) {
    return res.status(400).json({
      success: false,
      message: 'Missing Stripe signature'
    });
  }

  try {
    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const { userId, planType } = session.metadata || {};
        
        // In a real app, you would update the user's subscription status in your database
        console.log(`User ${userId} successfully subscribed to ${planType} plan`);
        
        break;
      }
      case 'invoice.payment_succeeded': {
        // Handle successful recurring payment
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`Payment succeeded for invoice ${invoice.id}`);
        
        break;
      }
      case 'customer.subscription.deleted': {
        // Handle subscription cancellation
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        
        // In a real app, you would update the user's subscription status in your database
        console.log(`Subscription ${subscription.id} for customer ${customerId} was cancelled`);
        
        break;
      }
      // Add other event types as needed
    }

    return res.status(200).json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return res.status(400).json({
      success: false,
      message: `Webhook error: ${error.message}`
    });
  }
};

/**
 * Get subscription status
 * @param req Request object
 * @param res Response object
 */
export const getSubscriptionStatus = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    // In a real app, you would fetch the user's subscription from your database
    // For demo purposes, using mock data
    const mockSubscription = {
      userId,
      status: 'active',
      plan: 'monthly',
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      contractsGenerated: 5,
      contractsLimit: 'unlimited',
      isLifetime: false
    };
    
    return res.status(200).json({
      success: true,
      data: mockSubscription
    });
  } catch (error: any) {
    console.error('Error getting subscription status:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error getting subscription status'
    });
  }
}; 