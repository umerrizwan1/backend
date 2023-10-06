const Form = require('../models/form');

// Get all users
const listUsers = async (req, res) => {
  try {
    const users = await Form.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await Form.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the user' });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new Form({ email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error:error.message });
  }
};

// Create a new user
const insertManyUsers = async (req, res) => {
    try {
      const usersData = req.body; // Assuming an array of user objects in the request body
      const users = await Form.insertMany(usersData);
      res.status(201).json(users);
    } catch (error) {
      res.status(500).json({ error:error.message });
    }
  };
  

// Update user by ID
const updateUserById = async (req, res) => {
  try {
    const user = await Form.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }
};

// Delete user by ID
const deleteUserById = async (req, res) => {
  try {
    const user = await Form.findByIdAndRemove(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
};

// Get user by email
const getUserByEmail = async (req, res) => {
    try {
      const user = await Form.findOne({ email: req.params.email.toLowerCase() });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the user' });
    }
  };

  // Change user's email by ID
const updateUserEmailById = async (req, res) => {
    try {
      const user = await Form.findByIdAndUpdate(req.params.id, { email: req.body.email.toLowerCase() }, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the user email' });
    }
  };// Change user's password by ID
  const updateUserPasswordById = async (req, res) => {
    try {
      const user = await Form.findByIdAndUpdate(req.params.id, { password: req.body.password }, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the user password' });
    }
  };
  
  // Get the number of users
  const getUserCount = async (req, res) => {
    try {
      const count = await Form.countDocuments();
      res.status(200).json({ count });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching user count' });
    }
  };
  
  // Get users with a specific role
  const getUsersByRole = async (req, res) => {
    try {
      const users = await Find.find({ role: req.params.role });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching users by role' });
    }
  };
  
  // Get users created within a date range
  const getUsersCreatedBetween = async (req, res) => {
    try {
      const { start, end } = req.params;
      const users = await Form.find({
        createdAt: { $gte: new Date(start), $lte: new Date(end) },
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching users created between dates' });
    }
  };
  
  // Get users sorted by registration date
  const getUsersSortedByRegistration = async (req, res) => {
    try {
      const users = await Form.find().sort({ createdAt: 'asc' });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching sorted users' });
    }
  };
  
  // Search for users by keyword
  const searchUsersByKeyword = async (req, res) => {
    try {
      const keyword = req.params.keyword;
      const users = await Form.find({
        $or: [
          { email: { $regex: keyword, $options: 'i' } },
          // Add more fields to search here if needed
        ],
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error:error.message});
    }
  };
  


module.exports = {
  listUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  getUserByEmail,
  updateUserEmailById,
  updateUserPasswordById,
  getUserCount,
  getUsersByRole,
  getUsersCreatedBetween,
  getUsersSortedByRegistration,
  searchUsersByKeyword,
  insertManyUsers,
};
