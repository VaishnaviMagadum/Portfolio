const express = require('express');
const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { username } = req.body;
  res.json({
    access_token: 'demo-token-' + Date.now(),
    user: {
      username: username || 'Recruiter Guest',
      email: `${(username || 'recruiter').toLowerCase()}@demo.local`
    }
  });
});

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { username } = req.body;
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    access_token: 'demo-token-' + Date.now(),
    user: {
      username: username || 'User',
      email: `${(username || 'user').toLowerCase()}@demo.local`
    }
  });
});

module.exports = router;

