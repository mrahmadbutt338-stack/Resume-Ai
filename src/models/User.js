import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    // Optional because users might sign in via Google OAuth
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Avoid OverwriteModelError in Next.js
export default mongoose.models.User || mongoose.model('User', UserSchema);
