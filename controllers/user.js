const Mongo= require("../models/user")
const createdata=async(req , res)=> {
    try {
        const{name, email, password}=req.body
        const mongo= new Mongo({
            name,
            email,password,
        })
        await mongo.save()
        res.json(mongo)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
const getAlldata=async(req , res)=> {
    try{
    const getmongo = await Mongo.find()
    res.json(getmongo)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};
const getById=async(req , res)=> {
    try{
    let dataAgainstId = await Mongo.findById(req.params.id)
    if(!dataAgainstId){
        return res.status(404).json({message:"DATA NOT FOUND"})
    }
    res.json(dataAgainstId)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};

//Deleting data by ID
const deleteById=async(req , res)=> {
    try{
    let dataAgainstId = await Mongo.findByIdAndDelete(req.params.id)
    if(!dataAgainstId){
        return res.status(404).json({message:"DATA NOT FOUND"})
    }
    res.json({message:"Deleted Successfully"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};

//updating data
const updatingById=async(req , res)=> {
    try{
        const{name, email, password}= req.body;
    let dataAgainstId = await Mongo.findByIdAndUpdate(req.params.id,
        {name,email,password},
        {new:true}
        )
    if(!dataAgainstId){
        return res.status(404).json({message:"DATA NOT FOUND"})
    }
    res.json(dataAgainstId)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};
//export the file
module.exports={
    createdata,
    getAlldata,
    getById,
    deleteById,
    updatingById
};