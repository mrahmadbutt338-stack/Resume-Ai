/**
 * AI Resume Builder - Backend Server
 * Express.js server with MongoDB, OpenAI, and Puppeteer integrations
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const resumeRoutes = require('./routes/resume');
const aiRoutes = require('./routes/ai');
const pdfRoutes = require('./routes/pdf');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging (development)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} | ${req.method} ${req.path}`);
  next();
});

// API Routes
app.use('/api/resumes', resumeRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/pdf', pdfRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Global error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Resume Builder API running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health\n`);
});

module.exports = app;
