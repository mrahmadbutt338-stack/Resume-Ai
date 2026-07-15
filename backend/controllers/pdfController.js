/**
 * PDF Controller
 * Generates high-quality PDF resumes using Puppeteer
 */

const puppeteer = require('puppeteer');
const { getTemplateHTML } = require('../utils/templates');

/**
 * Generate PDF from resume data
 * POST /api/pdf/generate
 */
exports.generatePDF = async (req, res, next) => {
  let browser;
  try {
    const { resumeData, template = 'modern' } = req.body;

    if (!resumeData || !resumeData.personalInfo) {
      return res.status(400).json({
        success: false,
        error: 'Please provide valid resume data'
      });
    }

    // Generate HTML for the selected template
    const html = getTemplateHTML(resumeData, template);

    // Launch Puppeteer and generate PDF
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set content and wait for styles to load
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Generate PDF with A4 size
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm'
      }
    });

    await browser.close();

    // Send PDF as response
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${resumeData.personalInfo.fullName || 'resume'}_resume.pdf"`,
      'Content-Length': pdf.length
    });

    res.send(pdf);
  } catch (error) {
    if (browser) await browser.close();
    console.error('PDF generation error:', error.message);
    next(error);
  }
};
