import User from '../models/user.js';
import { generateToken } from '../config/jwt.js';
import { catchAsync } from '../utils/catchAsync.js';

export const register = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ email, password });
  const token = generateToken(user._id);

  res.status(201).json({
    _id: user._id,
    email: user.email,
    token
  });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user._id);

  res.json({
    _id: user._id,
    email: user.email,
    token
  });
});