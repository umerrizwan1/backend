const express = require('express');
const router = express.Router();
const userController = require('../controllers/loginsystem');

router.post("/Signup", userController.Signup)
router.post("/Signin", userController.LoginUsers)
router.post("/request", userController.requestReset)
router.post("/resetpassword", userController.resetPassword)
module.exports = router;
