const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb://mongodb:27017/authService');

app.use(bodyParser.json());
app.use('/user', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Authentication Service running on port ${PORT}`);
});
