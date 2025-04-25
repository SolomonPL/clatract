import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * Register a new user
 * @param req Request object
 * @param res Response object
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      });
    }

    // In a real app, you would check if user already exists in your database
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // In a real app, you would save the user to your database
    // For demo purposes, returning mock response
    
    // Create JWT token
    const token = jwt.sign(
      { id: 'user_123', email }, 
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '7d' }
    );
    
    return res.status(201).json({
      success: true,
      data: {
        id: 'user_123',
        name,
        email,
        token
      }
    });
  } catch (error: any) {
    console.error('Error registering user:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error registering user'
    });
  }
};

/**
 * Login a user
 * @param req Request object
 * @param res Response object
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }
    
    // In a real app, you would verify credentials against your database
    // For demo purposes, using mock data
    const mockUser = {
      id: 'user_123',
      name: 'Test User',
      email: 'test@example.com',
      passwordHash: await bcrypt.hash('password123', 10)
    };
    
    // Check if user exists
    if (email !== mockUser.email) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, mockUser.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Create JWT token
    const token = jwt.sign(
      { id: mockUser.id, email: mockUser.email }, 
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '7d' }
    );
    
    return res.status(200).json({
      success: true,
      data: {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        token
      }
    });
  } catch (error: any) {
    console.error('Error logging in:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error logging in'
    });
  }
};

/**
 * Get user profile
 * @param req Request object
 * @param res Response object
 */
export const getProfile = async (req: Request, res: Response) => {
  try {
    // In a real app, user would be retrieved from database based on authenticated user ID
    // For demo purposes, using mock data
    const mockUser = {
      id: 'user_123',
      name: 'Test User',
      email: 'test@example.com',
      plan: 'free',
      contractsGenerated: 1,
      contractsRemaining: 0,
      joinDate: '2023-04-15T10:30:00Z'
    };
    
    return res.status(200).json({
      success: true,
      data: mockUser
    });
  } catch (error: any) {
    console.error('Error getting profile:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error getting profile'
    });
  }
}; 