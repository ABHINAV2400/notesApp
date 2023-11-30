const express = require('express');
const jwt = require('jsonwebtoken');
const Note = require('../models/note');
require('dotenv').config();


const router = express.Router();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { content } = req.body;
    const note = new Note({ content, createdBy: req.user.userId });
    await note.save();
    res.status(201).send(note);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {
    const notes = await Note.find({ createdBy: req.user.userId });
    res.status(200).send(notes);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      { content: req.body.content },
      { new: true }
    );
    if (!note) return res.status(404).send({ message: 'Note not found' });
    res.status(200).send(note);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, createdBy: req.user.userId });
    if (!note) return res.status(404).send({ message: 'Note not found' });
    res.status(200).send({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
