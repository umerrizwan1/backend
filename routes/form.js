const express = require('express');
const router = express.Router();
const userController = require('../controllers/form');

// Get all users
router.get('/listuser', userController.listUsers);

// Get user by ID
router.get('/getuserbyid:id', userController.getUserById);

// Create a new user
router.post('/createuser', userController.createUser);

// Create Many User
router.post('/createmanyuser', userController.insertManyUsers);

// Update user by ID
router.put('/updateuserbyid/:id', userController.updateUserById);

// Delete user by ID
router.delete('/delete/:id', userController.deleteUserById);

// Additional routes

// Get user by email
router.get('/email/:email', userController.getUserByEmail);

// Change user's email by ID
router.put('/:id/email', userController.updateUserEmailById);

// Change user's password by ID
router.put('/:id/password', userController.updateUserPasswordById);

// Get the number of users
router.get('/count', userController.getUserCount);

// Get users with a specific role
router.get('/role/:role', userController.getUsersByRole);

// Get users created within a date range
router.get('/created-between/:start/:end', userController.getUsersCreatedBetween);

// Get users sorted by registration date
router.get('/sorted-by-registration', userController.getUsersSortedByRegistration);

// Search for users by keyword
router.get('/search/:keyword', userController.searchUsersByKeyword);

module.exports = router;
