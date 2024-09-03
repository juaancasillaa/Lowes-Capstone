const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 5000;
require('dotenv').config();

// PostgreSQL connection setup
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, 
  ssl: {
    rejectUnauthorized: false
  }
});

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS

// Login API Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received login request:', email);

  try {
    const result = await pool.query(
      'SELECT * FROM Login WHERE email = $1 AND password = $2',
      [email, password]
    );
    console.log('Login result:', result.rows);

    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Database query error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Contact Form API Route
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, phoneNumber, email, comment } = req.body;
  
  console.log('Received contact form data:', {
    firstName,
    lastName,
    phoneNumber,
    email,
    comment
  });

  try {
    const result = await pool.query(
      'INSERT INTO contactus (first_name, last_name, email, phone_number, message) VALUES ($1, $2, $3, $4, $5) RETURNING*',
      [firstName, lastName, phoneNumber, email, comment]
    );
    console.log('Contact inserted successfully');

    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Database query error:', error.message);
    res.status(500).json({ error: error.message });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
