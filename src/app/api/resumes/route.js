import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import Resume from '@/models/Resume';

// GET: Fetch all resumes belonging to the authenticated user
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    
    // EXTREME SECURITY: Only query where userId strictly matches the session user ID
    const resumes = await Resume.find({ userId: session.user.id })
                                .sort({ updatedAt: -1 })
                                .lean(); // lean() for performance

    return NextResponse.json({ resumes }, { status: 200 });
  } catch (error) {
    console.error("GET Resumes Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Create a new resume profile for the authenticated user
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, data } = body;

    if (!name || !data) {
      return NextResponse.json({ error: 'Name and Data are required' }, { status: 400 });
    }

    await connectToDatabase();

    // The user requested that when saving a new profile, all previous profiles should be deleted.
    // "baaki sab wahan se data delete ho jana chahiye"
    await Resume.deleteMany({ userId: session.user.id });

    const newResume = await Resume.create({
      userId: session.user.id, // Strictly bind to authenticated user
      name,
      data,
    });

    return NextResponse.json({ resume: newResume, message: "Resume saved successfully" }, { status: 201 });
  } catch (error) {
    console.error("POST Resumes Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
