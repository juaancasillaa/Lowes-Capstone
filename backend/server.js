const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 5000;
require('dotenv').config();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "..", "build")));

// All other requests should send back the React app's index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
  });

// ----------Database connection setup-----------

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

  try {
    const result = await pool.query(
      'SELECT * FROM Login WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Contact Us API Route
app.post('/api/contact', async (req, res) => {
    const { firstName, lastName, phoneNumber, email, comment } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO contactus (first_name, last_name, phone_number, email, message) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [firstName, lastName, phoneNumber, email, comment]
      );
  
      res.status(200).json({ message: 'Form submitted successfully', data: result.rows[0] });
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ error: 'An error occurred. Please try again.' });
    }
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//-----------End Database connection setup-----------

// All other requests should send back the React app's index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
  });