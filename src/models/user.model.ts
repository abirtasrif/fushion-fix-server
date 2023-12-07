import mongoose, { Schema, model } from 'mongoose';
import { userType } from '../types/user.type';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { UserModelInterface } from '../interfaces/user.interface';

const userSchema = new Schema<userType>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    role: {
      enum: ['user', 'admin'],
      default: 'user',
      type: String,
      required: true,
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
      },
    ],
    orderStatus: {
      enum: ['pending', 'processing', 'resolved'],
      default: 'pending',
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//REGISTER AN USER
userSchema.statics.register = async function (
  name,
  email,
  password,
  photoUrl,
  address,
  phoneNumber
): Promise<userType> {
  if (!name || !email || !password || !photoUrl) {
    throw new Error('You must fill name, email, password and photoUrl');
  }

  const existingUser = await this.findOne({ email });

  if (existingUser) {
    throw new Error('This email is already registered');
  }

  if (!validator.isEmail(email)) {
    throw new Error('Invalid Email');
  }
  if (!validator.isStrongPassword) {
    throw new Error(
      'Password will be minimum 8 char with uppercase, lowercase, number and symbol'
    );
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hash,
    photoUrl,
    address,
    phoneNumber,
  });

  return user;
};

//LOGIN AN USER
userSchema.statics.login = async function (email, password): Promise<userType> {
  if (!email || password) {
    throw new Error('You must fill email and password');
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw new Error('Incorrect email or password ');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error('Incorrect email or password ');
  }

  return user;
};

const UserModel = model<userType, UserModelInterface>('User', userSchema);

export default UserModel;
