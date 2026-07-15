/**
 * Resume Routes
 * CRUD endpoints for resume data and template listing
 */

const express = require('express');
const router = express.Router();
const {
  createResume,
  getResume,
  updateResume,
  deleteResume,
  getTemplates
} = require('../controllers/resumeController');

// Template listing (must be before /:id to avoid conflicts)
router.get('/templates', getTemplates);

// CRUD routes
router.post('/', createResume);
router.get('/:id', getResume);
router.put('/:id', updateResume);
router.delete('/:id', deleteResume);

module.exports = router;
