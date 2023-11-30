const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');
const noteRoutes = require('./routes/note');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://mongodb:27017/notesApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());

// User routes for authentication
app.use('/user', userRoutes);

// Note routes
app.use('/note', noteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
