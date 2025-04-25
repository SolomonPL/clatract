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

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [/\.vercel\.app$/, /localhost:\d+$/] 
    : 'http://localhost:5173',
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(helmet({
  contentSecurityPolicy: false // Disable CSP for development
}));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use('/api/offers', offerRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Clatract API!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app; 