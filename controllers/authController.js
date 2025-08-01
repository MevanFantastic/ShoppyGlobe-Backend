const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) 
    return res.status(400).json({ message: 'Email and password are required' });
  try {



    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

  
    const hashed = await bcrypt.hash(password, 10);
    user = new User({ email, password: hashed });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    next(err);
  }
};


exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) 
    return res.status(400).json({ message: 'Email and password are required' });
  try {
    const user = await User.findOne({ email });
    if (!user) 
      return res.status(401).json({ message: 'Invalid credentials' });

   
   const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) 
      return res.status(401).json({ message: 'Invalid credentials' });



         // 1hrs 
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
  } catch (err) {
    next(err);
  }
};
