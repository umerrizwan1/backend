const mongoose = require("mongoose")
const url="mongodb+srv://roxxumer2016:Ifandif123@cluster0.84sgozt.mongodb.net/"
mongoose.connect(url, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() =>{
    console.log("db connected")
})

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection failed"))
 
module.exports=mongoose;