import { NextResponse } from 'next/server';
import { generateFromPrompt, getMockResumeData } from '@/lib/openai';

// POST: Generate structured resume data from a prompt
export async function POST(request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt || prompt.trim().length < 20) {
      return NextResponse.json({
        success: false,
        error: 'Please provide a detailed description (at least 20 characters)'
      }, { status: 400 });
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      console.log('⚠️ No OpenAI API key set — returning mock data');
      const mockData = getMockResumeData();
      return NextResponse.json({
        success: true,
        data: mockData,
        mock: true,
        message: 'Using sample data. Set OPENAI_API_KEY in .env.local for real AI generation.'
      });
    }

    const resumeData = await generateFromPrompt(prompt);

    return NextResponse.json({
      success: true,
      data: resumeData
    });

  } catch (error) {
    // If OpenAI fails, return mock data with warning
    if (error.message?.includes('API') || error.code === 'ENOTFOUND') {
      console.error('OpenAI API error, returning mock data:', error.message);
      const mockData = getMockResumeData();
      return NextResponse.json({
        success: true,
        data: mockData,
        mock: true,
        message: 'AI service unavailable. Using sample data instead.'
      });
    }
    console.error("AI Generation Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
