const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
require('dotenv').config();


const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET; // Use a secure and unique key

router.post('/register', async (req, res) => {
  try {
    console.log("register triggered");
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).send({ token });
    console.log(username," success")
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;
