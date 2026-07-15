/**
 * AI Routes
 * Endpoints for OpenAI-powered resume generation and enhancement
 */

const express = require('express');
const router = express.Router();
const { generateFromPrompt, enhance } = require('../controllers/aiController');

// Generate resume from text prompt
router.post('/generate-from-prompt', generateFromPrompt);

// Enhance existing resume content
router.post('/enhance', enhance);

module.exports = router;
