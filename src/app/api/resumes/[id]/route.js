import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/mongodb';
import Resume from '@/models/Resume';

// PUT: Update an existing resume
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { name, data } = body;

    await connectToDatabase();

    // SECURITY: Ensure the document belongs to the session user before updating
    const existingResume = await Resume.findOne({ _id: id, userId: session.user.id });
    if (!existingResume) {
      return NextResponse.json({ error: 'Not Found or Unauthorized' }, { status: 404 });
    }

    existingResume.name = name || existingResume.name;
    existingResume.data = data || existingResume.data;
    await existingResume.save();

    return NextResponse.json({ resume: existingResume, message: "Resume updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("PUT Resume Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE: Remove an existing resume
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    await connectToDatabase();

    // SECURITY: Only delete if the document belongs to the authenticated user
    const deletedResume = await Resume.findOneAndDelete({ _id: id, userId: session.user.id });
    
    if (!deletedResume) {
      return NextResponse.json({ error: 'Not Found or Unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ message: "Resume deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE Resume Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
