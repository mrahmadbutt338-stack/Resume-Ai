/**
 * Resume Controller
 * Handles CRUD operations for resume data
 */

const Resume = require('../models/Resume');

/**
 * Create a new resume
 * POST /api/resumes
 */
exports.createResume = async (req, res, next) => {
  try {
    const resume = await Resume.create(req.body);
    res.status(201).json({
      success: true,
      data: resume
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a resume by ID
 * GET /api/resumes/:id
 */
exports.getResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }

    res.json({
      success: true,
      data: resume
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a resume
 * PUT /api/resumes/:id
 */
exports.updateResume = async (req, res, next) => {
  try {
    const resume = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }

    res.json({
      success: true,
      data: resume
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a resume
 * DELETE /api/resumes/:id
 */
exports.deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get available templates
 * GET /api/resumes/templates
 */
exports.getTemplates = async (req, res) => {
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Bold two-column layout with a vibrant header and clean timeline. Perfect for tech and creative professionals.',
      color: '#2563EB',
      features: ['Two-column layout', 'Bold header', 'Timeline experience', 'Skill bars']
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean single-column design with generous whitespace. Ideal for those who let their work speak for itself.',
      color: '#64748B',
      features: ['Single column', 'Ample whitespace', 'Clean typography', 'Subtle dividers']
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Eye-catching design with color accents and unique section styling. Great for designers and marketers.',
      color: '#F59E0B',
      features: ['Color accents', 'Unique dividers', 'Icon integration', 'Dynamic layout']
    },
    {
      id: 'corporate',
      name: 'Corporate',
      description: 'Traditional, structured format with serif fonts. Trusted by executives and enterprise professionals.',
      color: '#1E293B',
      features: ['Traditional format', 'Serif typography', 'Structured blocks', 'Conservative style']
    },
    {
      id: 'elegant',
      name: 'Elegant',
      description: 'Refined design with subtle borders and sophisticated typography. A timeless choice for any industry.',
      color: '#7C3AED',
      features: ['Refined borders', 'Sophisticated fonts', 'Muted palette', 'Balanced spacing']
    }
  ];

  res.json({
    success: true,
    data: templates
  });
};
