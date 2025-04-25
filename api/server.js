const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { execSync } = require('child_process');

// Check if TypeScript is available and compile if needed
try {
  execSync('which tsc', { stdio: 'ignore' });
  // If tsc is available, we'll use the TypeScript server
  module.exports = require('../server/dist/index');
} catch (e) {
  // If tsc is not available, we'll create a simple Express server
  const app = express();
  
  // Middleware
  app.use(cors({ origin: '*' }));
  app.use(bodyParser.json({ limit: '10mb' }));
  
  // Root route
  app.get('/', (req, res) => {
    res.json({ message: 'API server is running' });
  });
  
  // Offers route
  app.post('/api/offers/generate', (req, res) => {
    res.json({
      success: true,
      data: {
        oneLiner: "AI-powered clarity for compelling service offers",
        elevatorPitch: "Our service helps freelancers and businesses create clear, compelling messaging to attract ideal clients and close more deals."
      }
    });
  });
  
  // Contracts route
  app.post('/api/contracts/generate', (req, res) => {
    res.json({
      success: true,
      data: {
        id: Date.now().toString(),
        content: 'This is a sample contract. In production, this would be generated using OpenAI.',
        provider: req.body.providerName || 'Sample Provider',
        client: req.body.clientName || 'Sample Client',
        created: new Date()
      }
    });
  });
  
  // User routes
  app.post('/api/users/register', (req, res) => {
    res.json({
      success: true,
      data: {
        id: 'user_123',
        name: req.body.name || 'Test User',
        email: req.body.email || 'test@example.com',
        token: 'sample_jwt_token'
      }
    });
  });
  
  app.post('/api/users/login', (req, res) => {
    res.json({
      success: true,
      data: {
        id: 'user_123',
        name: 'Test User',
        email: req.body.email || 'test@example.com',
        token: 'sample_jwt_token'
      }
    });
  });
  
  // Handle 404
  app.use((req, res) => {
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ 
        success: false, 
        message: 'API endpoint not found' 
      });
    }
    res.status(404).json({ message: 'Not found' });
  });
  
  module.exports = app;
} 