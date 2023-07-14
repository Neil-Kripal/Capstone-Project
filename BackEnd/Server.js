const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/Users');

const app = express();
const PORT = 5500;
const mongoURL = 'mongodb://127.0.0.1:27017/ExpenseWise';

mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');

    app.use(express.json());

    app.post('/signup', async (req, res) => {
      const { username, password } = req.body;
    
      try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return res.status(409).json({ error: 'Username already exists' });
        }
    
        const newUser = new User({ username, password });
        await newUser.save();
    
        res.status(201).json({ message: 'User created successfully' });
      } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'An error occurred' });
      }
    });

    app.post('/login', async (req, res) => {
      const { username, password } = req.body;
      try {
        const user = await User.findOne({ username, password });
        if (!user) {
          return res.status(401).json({ error: 'Invalid username or password' });
        }
        res.status(200).json({ message: 'Login successful' });
      } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'An error occurred' });
      }
    });

    app.use((req, res, next) => {
      res.setHeader('Cache-Control', 'no-store');
      next();
    });
    

    // Serve the HTML file
    app.use(express.static('public'));

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });
