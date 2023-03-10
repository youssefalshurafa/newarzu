import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please Provide unique username'],
    unique: [true, 'Username exists'],
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    unique: false,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    unique: false,
  },
  fullName: { type: String },
  mobile: { type: Number },
  address: { type: String },
  profile: { type: String },
  refreshToken: String,
});

export default mongoose.model.Users || mongoose.model('User', UserSchema);
