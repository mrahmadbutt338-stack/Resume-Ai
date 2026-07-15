/**
 * Global Error Handler Middleware
 * Catches all errors and returns consistent JSON responses
 */

const errorHandler = (err, req, res, next) => {
  console.error(`❌ Error: ${err.message}`);
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: messages
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      error: 'Duplicate field value entered'
    });
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: `Invalid ${err.path}: ${err.value}`
    });
  }

  // OpenAI API error
  if (err.name === 'OpenAIError' || err.code === 'OPENAI_ERROR') {
    return res.status(502).json({
      success: false,
      error: 'AI service temporarily unavailable. Please try again.'
    });
  }

  // Default server error
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
};

module.exports = errorHandler;
