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

    // Endpoint for signing up 
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

    // Endpoint for logging in
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

     // Endpoint for fetching user data to be used for the application
    app.post('/user', async (req,res) => {
      const {userId:username} = req.body;
      console.log(req.body);
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
      
        res.status(200).json({ message: 'User Found', expenses:user.expenses, categories:user.categories, savingGoals:user.savingGoals, budget:user.budget});
      } catch (err) {
        console.error('Error saving expense:', err);
        res.status(500).json({ error: 'An error occurred' });
      }
    });

     // Endpoint for saving the categories
    app.post('/saveCategories', async (req, res) => {
      const { userId: username, category } = req.body;
    
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        user.categories.push(category);
        await user.save();
    
        res.status(200).json({ message: 'Category saved successfully', category }); // Return the saved category
      } catch (err) {
        console.error('Error saving category:', err);
        res.status(500).json({ error: 'An error occurred' });
      }
    });
    

// Endpoint for saving an expense
app.post('/saveExpense', async (req, res) => {
  const { userId:username, expense } = req.body;
  console.log(req.body);
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
  const { userId: username, savingGoal } = req.body;
  console.log(req.body);

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

// Endpoint for updating fundsto saving goal
app.post('/updateFundsAdded', async (req, res) => {
  const { userId: username, goalName, fundsAdded } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const savingGoalIndex = user.savingGoals.findIndex(goal => goal.name === goalName);
    if (savingGoalIndex === -1) {
      return res.status(404).json({ error: 'Saving goal not found' });
    }

    // Update the fundsAdded value for the corresponding saving goal
    user.savingGoals[savingGoalIndex].fundsAdded = fundsAdded;
    await user.save();

    res.status(200).json({ message: 'FundsAdded updated successfully' });
  } catch (err) {
    console.error('Error updating fundsAdded:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

 // Endpoint for fetching data for expenses page
app.post('/userData', async (req, res) => {
  const { userId: username } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    res.status(200).json({ message: 'User Found', expenses: user.expenses, categories: user.categories });
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Endpoint for deleting an expense
app.post('/deleteExpense', async (req, res) => {
  const { userId: username, expenseId } = req.body;

  console.log(req.body,"expense.body");

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.expenses = user.expenses.filter((expense) => expense.id !== expenseId);
    await user.save();
    
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (err) {
    console.error('Error deleting expense:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

 // Endpoint for saving budget
app.post('/saveBudget', async (req, res) => {
  const { userId: username, budget } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.budget.amount = budget;
    await user.save();
    console.log(budget)

    return res.json({ message: 'Budget saved successfully' });
  } catch (error) {
    console.error('Error saving budget:', error);
    return res.status(500).json({ error: 'An error occurred while saving the budget' });
  }
});

 // Endpoint for fetching the saved budget
app.post('/getBudget', async (req, res) => {
  const { userId: username } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Retrieve the budget value from the user object and send it in the response
    return res.json({ budget: user.budget.amount });
  } catch (error) {
    console.error('Error fetching budget:', error);
    return res.status(500).json({ error: 'An error occurred while fetching the budget' });
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