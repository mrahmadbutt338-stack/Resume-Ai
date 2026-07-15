/**
 * PDF Routes
 * Endpoint for generating downloadable PDF resumes
 */

const express = require('express');
const router = express.Router();
const { generatePDF } = require('../controllers/pdfController');

// Generate PDF from resume data + template
router.post('/generate', generatePDF);

module.exports = router;
