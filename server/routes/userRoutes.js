const express = require('express');
const router = express.Router();
const User = require('../models/User');



router.get('/', async (req, res) => {
  try{

    const users = await User.find();
    res.json(users);
  }
  catch(err)
  {
    console.log(err);
  }
});


router.post('/add', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: 'Update failed', message: err.message });
  }
});

module.exports = router;
