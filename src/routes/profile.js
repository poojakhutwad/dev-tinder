
const express =  require("express");
const { userAuth } = require("../middleware/auth");
const { validateEditUser, validateForgotPassword} = require("../utils/validations");
const profileRouter = express.Router();
//get profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user; //As User data is coming from userAuth middleware
        res.send(user);
    } catch (err) {
        res.status(500).send("Error: " + err);
    }

});

//Update Profile
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try{
       if(validateEditUser(req)){
        throw new Error("Invalid Edit Request");
       }
       const loggedInUser = req.user;
       Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]))
       await loggedInUser.save();
       res.json({message: `${loggedInUser.firstName}, your profile updated successfully`, data: loggedInUser})

    }catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
})

profileRouter.patch("/`profile/password", userAuth, async (req, res) => {
    try{
        if(!validateForgotPassword(req)){
            throw new Error("Edit not allowed")
        }
    }catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
})

module.exports = profileRouter;