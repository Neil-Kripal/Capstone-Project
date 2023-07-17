const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    categories: [
        {
          name: String,
          color: String,
        },
      ],
      expenses: [
        {
          name: String,
          amount: Number,
          date: Date,
          category: String,
        },
      ],
      savingGoals: [
        {
          name: String,
          amount: Number,
          dueDate: Date,
          participants: [String],
        },
      ],
    });
    
const User = mongoose.model('User', userSchema);

module.exports = User;