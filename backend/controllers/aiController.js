/**
 * AI Controller
 * Handles OpenAI integration for resume generation and enhancement
 */

const { generateFromPrompt, enhanceResume, getMockResumeData } = require('../utils/openai');

/**
 * Generate resume from free-text prompt
 * POST /api/ai/generate-from-prompt
 */
exports.generateFromPrompt = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim().length < 20) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a detailed description (at least 20 characters)'
      });
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      console.log('⚠️  No OpenAI API key set — returning mock data');
      const mockData = getMockResumeData();
      return res.json({
        success: true,
        data: mockData,
        mock: true,
        message: 'Using sample data. Set OPENAI_API_KEY in .env for real AI generation.'
      });
    }

    const resumeData = await generateFromPrompt(prompt);

    res.json({
      success: true,
      data: resumeData
    });
  } catch (error) {
    // If OpenAI fails, return mock data with warning
    if (error.message?.includes('API') || error.code === 'ENOTFOUND') {
      console.error('OpenAI API error, returning mock data:', error.message);
      const mockData = getMockResumeData();
      return res.json({
        success: true,
        data: mockData,
        mock: true,
        message: 'AI service unavailable. Using sample data instead.'
      });
    }
    next(error);
  }
};

/**
 * Enhance existing resume content with AI
 * POST /api/ai/enhance
 */
exports.enhance = async (req, res, next) => {
  try {
    const { resumeData } = req.body;

    if (!resumeData || !resumeData.personalInfo) {
      return res.status(400).json({
        success: false,
        error: 'Please provide valid resume data to enhance'
      });
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      console.log('⚠️  No OpenAI API key set — returning original data');
      return res.json({
        success: true,
        data: resumeData,
        mock: true,
        message: 'Set OPENAI_API_KEY in .env for AI enhancement.'
      });
    }

    const enhanced = await enhanceResume(resumeData);

    res.json({
      success: true,
      data: enhanced
    });
  } catch (error) {
    if (error.message?.includes('API') || error.code === 'ENOTFOUND') {
      console.error('OpenAI API error:', error.message);
      return res.json({
        success: true,
        data: req.body.resumeData,
        mock: true,
        message: 'AI enhancement unavailable. Original data returned.'
      });
    }
    next(error);
  }
};
