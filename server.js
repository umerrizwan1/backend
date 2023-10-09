const express = require('express');
const app = express();
const mongoose=require("./config/connection")
const userapis = require("./routes/user");
const loginuser = require("./routes/loginsystem")
const uservalidationapis = require("./routes/form");
const loginUser = require("./routes/loginsystem")
const dotenv = require('dotenv')
const bodyParser=require("body-parser")
dotenv.config();
let port = process.env.PORT || 3000;
app.use(bodyParser.json())

app.use(express.static("public"));
app.use('/user', userapis)
app.use('/validation', uservalidationapis)
app.use('/signup', loginUser)


app.listen(port, "localhost", (req,res) => {
    console.log(`server start at http://localhost: ${port}`);
})