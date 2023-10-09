const express = require('express');
const router = express.Router();
const userController = require('../controllers/loginsystem');

router.post("/Signup", userController.Signup)
router.post("/Signin", userController.LoginUsers)
module.exports = router;
