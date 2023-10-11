const express = require("express");
const router = express.Router();
const userController = require('../controllers/user')
const {authenticateWithToken,checkRole} = require("../middleware/userMiddleware")
// user controller or creating routes

router.post("/createuser", userController.createdata)
router.get("/getAlldata", authenticateWithToken,checkRole("admin","HR"),userController.getAlldata)
router.get("/getById/:id",  authenticateWithToken,userController.getById)
router.delete("/userdelete/:id", userController.deleteById)
router.put("/userupdate/:id", userController.updatingById)
module.exports=router;