const mongoose = require('mongoose');
const { isEmail, isIn } = require('validator');
//Signin User
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: isEmail,
      message: 'Invalid email address',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Minimum password length
  },
  role: {
    type: String,
    enum: ['customer','admin','HR','Manager'],
    default: 'customer'
}
});

module.exports = mongoose.model('LoginTest', userSchema);