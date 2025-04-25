import express from 'express';
import * as paymentController from '../controllers/payment.controller';

const router = express.Router();

// Create subscription
router.post('/create-subscription', paymentController.createSubscription);

// Handle webhook events from Stripe
router.post('/webhook', paymentController.handleWebhook);

// Get subscription status
router.get('/subscription/:userId', paymentController.getSubscriptionStatus);

export default router; 