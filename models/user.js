const mongoose=require('mongoose');
const mongoschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    }
})

const Mongo=mongoose.model("User", mongoschema)
module.exports = Mongo;