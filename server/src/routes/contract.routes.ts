import express from 'express';
import * as contractController from '../controllers/contract.controller';

const router = express.Router();

// Generate a contract based on offer details
router.post('/generate', contractController.generateContract);

// Get contract by ID
router.get('/:id', contractController.getContractById);

// Export contract as PDF
router.get('/:id/export', contractController.exportContract);

export default router; 