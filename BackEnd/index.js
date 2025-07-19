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

// Import routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);


// // Root route
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port  ${port}`);
});