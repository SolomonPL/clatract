import express from 'express';
import * as offerController from '../controllers/offer.controller';

const router = express.Router();

// Generate offer clarity (one-liner, elevator pitch)
router.post('/generate', offerController.generateOfferClarity);

export default router; 