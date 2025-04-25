import express from 'express';
import * as userController from '../controllers/user.controller';

const router = express.Router();

// User registration
router.post('/register', userController.register);

// User login
router.post('/login', userController.login);

// Get user profile
router.get('/profile', userController.getProfile);

export default router; 