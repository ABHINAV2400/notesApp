const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const noteRoutes = require('./routes/note');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://mongodb:27017/notesApp');

app.use(cors());
app.use(bodyParser.json());

// Note routes
app.use('/', noteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
