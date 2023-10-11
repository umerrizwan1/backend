const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")
const smtpTransport = require("nodemailer-smtp-transport"); 
const User = require("../models/loginsystem");
//SignUp Api
const Signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);
    const loginUser = new User({ username, email, password: hashpassword });
    await loginUser.save();
    res.status(201).json({ message: "User created Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//SignIn Api
const LoginUsers = async(req,res)=>{
    try{
        const {email, password}=req.body;
        const Users= await User.findOne({email});
        if(Users && await bcrypt.compare(password,Users.password)){
            const token = jwt.sign({userId:Users.id,email:Users.email,role:Users.role}, process.env.PRIVATE_KEY, {expiresIn:"1hr"})
            res.status(200).json({token})
        }else{
            res.status(401).json({error:"invalid credentional"})
        }
    }catch (error){
        res.status(500).json({error:error.message})
    }
}


// Request Password Reset
const requestReset = async (req, res) => {
    try {
      const { email } = req.body;
      // Check if the user with the provided email exists in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a unique reset token (you can use a library like crypto.randomBytes)
      const resetToken = jwt.sign({ userId: user.id }, 'reset-secret-key', {
        expiresIn: '1h', // Token expiration time (adjust as needed)
      });
  
      res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
//Reset Api
const resetPassword = async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      // Verify the token
      const decodedToken = jwt.verify(token, 'reset-secret-key');
      const userId = decodedToken.userId;
  
      // Find the user by userId
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

module.exports= {
    Signup,
    LoginUsers,
    requestReset,
    resetPassword
}