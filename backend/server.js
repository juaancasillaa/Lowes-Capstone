const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // For password hashing
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

const corsOptions = {
  origin: 'http://localhost:3000', // Adjust this if necessary
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Login API Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received login request:', email);

  try {
    const result = await pool.query(
      'SELECT * FROM login WHERE email = $1',
      [email]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        res.status(200).json({
          message: 'Login successful',
          user: { id: user.id, email: user.email, isadmin: user.isadmin }
        });
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
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
      'INSERT INTO contactus (first_name, last_name, email, phone_number, message) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [firstName, lastName, phoneNumber, email, comment]
    );
    console.log('Contact inserted successfully:', result.rows[0]);

    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Database query error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Database query error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/events', async (req, res) => {
  const { title, details, address, startdate, enddate } = req.body;

  if (!startdate || !enddate) {
    return res.status(400).json({ error: 'Start and end dates are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO events (title, details, address, startdate, enddate) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, details, address, startdate, enddate]
    );
    res.status(200).json(result.rows[0]); // The result will include the auto-generated ID
  } catch (error) {
    console.error('Database insert error:', error.message);
    res.status(500).json({ error: 'Failed to add event' });
  }
});


// Update Event Query
app.put('/api/events/:id', async (req, res) => {
  const { id } = req.params;
  const { title, details, address, startdate, enddate } = req.body;

  try {
    const result = await pool.query(
      'UPDATE events SET title = $1, details = $2, address = $3, startdate = $4, enddate = $5 WHERE id = $6 RETURNING *',
      [title, details, address, startdate, enddate, id]
    );
    if (result.rowCount > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    console.error('Error updating event:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM events WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount > 0) {
      res.status(200).json({ message: 'Event deleted successfully' });
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    console.error('Error deleting event:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});