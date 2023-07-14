const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = 3000;
const mongoURL = 'mongodb://127.0.0.1:27017/ExpenseWise';

mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');

    // Add your server routes and logic here

    app.get('/api/expenses', (req, res) => {
      // Perform database query to fetch expenses
      // Return the expenses as a JSON response
      res.json({ message: 'Expenses API' });
    });

    // Start the server
    app.listen(3000, () => {
      console.log('Server is listening on port 3000');
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });
