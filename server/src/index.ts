import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

// Import routes
import offerRoutes from './routes/offer.routes';
import contractRoutes from './routes/contract.routes';
import userRoutes from './routes/user.routes';
import paymentRoutes from './routes/payment.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration - allow all origins in Vercel environment
const corsOptions = {
  origin: '*',  // Allow all origins for API endpoints
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['X-Requested-With', 'Content-Type', 'Authorization', 'Accept']
};

// Middleware
app.use(cors(corsOptions));
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for development
  crossOriginResourcePolicy: false // Allow cross-origin resource sharing
}));
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '10mb' }));  // Increase payload size limit
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

// API routes
app.use('/api/offers', offerRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Clatract API!' });
});

// Handle 404 - Keep this as the last route
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ 
      success: false, 
      message: 'API endpoint not found' 
    });
  }
  // For non-API routes, let the frontend handle it
  res.status(200).json({ message: 'Not an API route' });
});

// Only start the server if not running in a serverless environment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} else {
  console.log('Running in production mode (serverless)');
}

export default app; 