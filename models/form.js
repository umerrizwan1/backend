const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (email) => {
        // Use a regular expression to validate the email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
      message: "is not a valid email address!"
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (password) => {
        // Use a regular expression to validate the password format (e.g., at least 8 characters)
        return password.length >= 8;
      },
      message: 'Password must be at least 8 characters long',
    },
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Add any other roles your application needs
    default: 'user', // Set a default role if none is provided
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Form = mongoose.model('Forms', userSchema);

module.exports = Form;
