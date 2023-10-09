const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/loginsystem");

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

const LoginUsers = async(req,res)=>{
    try{
        const {email, password}=req.body;
        const Users= await User.findOne({email});
        if(Users && await bcrypt.compare(password,Users.password)){
            const token = jwt.sign({userId:Users.id,email:Users.email}, "SK1234FGHJKLMNCDERTIONSDERJJJJKL", {expiresIn:"1hr"})
            res.status(200).json({token})
        }else{
            res.status(401).json({error:"invalid credentional"})
        }
    }catch (error){
        res.status(500).json({error:error.message})
    }
}

module.exports= {
    Signup,
    LoginUsers
}