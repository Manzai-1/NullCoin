import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ['user', 'miner', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLength: 8,
    select: false
  },
});

userSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.checkPassword = async function(passwordToCheck, userPassword) {
  return await bcrypt.compare(passwordToCheck, userPassword);
}

export default mongoose.model('User', userSchema);