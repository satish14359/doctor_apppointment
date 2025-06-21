const User = require('../models/userModel'); // Make sure this path is correct
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 👉 Register Controller
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    console.log("Registering:", { name, email, password, phone });


    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      isdoctor: false,
      notification: [],
    });

    await newUser.save();

    // Generate JWT Token (optional for login)
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        type: newUser.type,
      },
      token,
    });
  } catch (error) {
    console.error(error); // Helpful for debugging
    return res.status(500).json({ message: 'Server error' });
  }
};


// 👉 Login Controller
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return res.status(200).json({
      success:true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        type: user.type,          
    isdoctor: user.isdoctor
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { 
  registerUser,
  loginUser
 };

 
