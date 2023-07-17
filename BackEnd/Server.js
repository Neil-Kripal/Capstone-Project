const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/Users');
const Cors = require('cors');

const app = express();
const PORT = 3000;
const mongoURL = 'mongodb://127.0.0.1:27017/ExpenseWise';

mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');

    app.use(Cors());

    app.use(express.json());

    app.post('/signup', async (req, res) => {
      const { username, password } = req.body;
      console.log("Signed Up");
    
      try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          return res.status(409).json({ error: 'Username already exists' });
        }
    
        const newUser = new User({
          username,
          password,
          categories: [], 
          expenses: [], 
          savingGoals: [], 
        });
    
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
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
          return res.status(401).json({ error: 'Invalid username or password' });
        }
    
        res.status(200).json({
          message: 'Login successful',
          username: user.username,
          categories: user.categories,
          expenses: user.expenses,
          savingGoals: user.savingGoals,
        });
      } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: 'An error occurred' });
      }
    });

// Endpoint for saving an expense
app.post('/saveExpense', async (req, res) => {
  const { username, expense } = req.body;
  console.log("expense", expense);

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.expenses.push(expense);
    await user.save();

    res.status(200).json({ message: 'Expense saved successfully' });
  } catch (err) {
    console.error('Error saving expense:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Endpoint for saving a saving goal
app.post('/saveSavingGoal', async (req, res) => {
  const { username, savingGoal } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.savingGoals.push(savingGoal);
    await user.save();

    res.status(200).json({ message: 'Saving goal saved successfully' });
  } catch (err) {
    console.error('Error saving saving goal:', err);
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
