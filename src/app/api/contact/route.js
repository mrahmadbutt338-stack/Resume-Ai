import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import ContactMessage from '@/models/ContactMessage';

export async function POST(req) {
  try {
    const { firstName, lastName, email, message } = await req.json();

    // 1. Connect to Database and Save the Message securely (Non-blocking)
    try {
      await connectToDatabase();
      await ContactMessage.create({
        firstName,
        lastName,
        email,
        message,
      });
      console.log("Message saved to database successfully.");
    } catch (dbError) {
      console.error("Failed to save message to database (MongoDB issue):", dbError);
      // We don't return here. We still want to send the email!
    }

    // 2. Attempt to send an email (if configured)
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn("EMAIL_USER or EMAIL_PASS is not set in .env! Email not sent, but message saved to DB.");
      return NextResponse.json({ success: true, warning: 'Message saved to database. Email not sent due to missing credentials.' }, { status: 200 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      text: `You have received a new message from your website contact form:\n\nName: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Nodemailer Error:', emailError);
      return NextResponse.json({ error: 'Message saved, but failed to send email notification. Check email credentials.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Message sent and saved successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Failed to process message completely.' }, { status: 500 });
  }
}
