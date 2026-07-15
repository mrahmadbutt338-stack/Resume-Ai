import { NextResponse } from 'next/server';
import { enhanceResume } from '@/lib/openai';

// POST: Enhance existing resume data
export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
    const { resumeData } = body;

    if (!resumeData || !resumeData.personalInfo) {
      return NextResponse.json({
        success: false,
        error: 'Please provide valid resume data to enhance'
      }, { status: 400 });
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      console.log('⚠️ No OpenAI API key set — returning original data');
      return NextResponse.json({
        success: true,
        data: resumeData,
        mock: true,
        message: 'Set OPENAI_API_KEY in .env.local for AI enhancement.'
      });
    }

    const enhanced = await enhanceResume(resumeData);

    return NextResponse.json({
      success: true,
      data: enhanced
    });

  } catch (error) {
    if (error.message?.includes('API') || error.code === 'ENOTFOUND') {
      console.error('OpenAI API error:', error.message);
      return NextResponse.json({
        success: true,
        data: body.resumeData, // Fixed scope issue
        mock: true,
        message: 'AI enhancement unavailable. Original data returned.'
      });
    }
    console.error("AI Enhance Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
