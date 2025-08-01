const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST /register
exports.register = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) 
    return res.status(400).json({ message: 'Email and password are required' });
  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashed = await bcrypt.hash(password, 10); // salt rounds = 10:contentReference[oaicite:6]{index=6}
    user = new User({ email, password: hashed });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    next(err);
  }
};

// POST /login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) 
    return res.status(400).json({ message: 'Email and password are required' });
  try {
    const user = await User.findOne({ email });
    if (!user) 
      return res.status(401).json({ message: 'Invalid credentials' });

    // Compare password
   const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) 
      return res.status(401).json({ message: 'Invalid credentials' });

    // Create JWT (expires in 1h)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
