require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Routes (will create separately)
const contactRoutes = require('./routes/contact');
const projectRoutes = require('./routes/projects');
const chatRoutes = require('./routes/chat');

app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/chat', chatRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Basic health check
app.get('/', (req, res) => {
  res.send('Portfolio API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
