const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

const port = 5000;
require('./config/db.js');

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Sample user data for testing
const userSchema = [
  { email: 'aniket@gmail.com', password: 'password123' },
  { email: 'john.doe@example.com', password: 'john123' },
  { email: 'jane.doe@example.com', password: 'jane123' },
];

// Login route
app.post('/login', async (req, res) => {
  console.log('Route hit: /login');
  const { email, password } = req.body;

  console.log('👉 Login request received: ', email, password);

  try {
    // Simulate database search with sample data
    const user = userSchema.find((u) => u.email.toLowerCase() === email.toLowerCase());
    console.log('🔍 Found user:', user);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    return res.json({ message: 'Login successful', user });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});