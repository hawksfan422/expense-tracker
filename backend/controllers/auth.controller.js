import User from '../models/user.js';
import { generateToken } from '../config/jwt.js';
import { catchAsync } from '../utils/catchAsync.js';

export const register = catchAsync(async (req, res) => {
  const { username, password } = req.body;

  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ username, password });
  const token = generateToken(user._id);

  res.status(201).json({
    _id: user._id,
    username: user.username,
    token
  });
});

export const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(user._id);

  res.json({
    _id: user._id,
    username: user.username,
    token
  });
});