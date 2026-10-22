const express = require("express");
const authRouter =  express.Router();
const User = require("../models/user");
const { Validator } = require("../utils/validations")
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
    try {
        //validation of data
        Validator(req);

        const { firstName, lastName, emailId, password } = req.body;

        //encrpt the password using bcrypt library
        const passwordHash = await bcrypt.hash(password, 10)
        console.log(passwordHash);

        //create new instance of user model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        })
        console.log("user", user)

        await user.save();

        console.log("User saved:", user);

        res.send("User Added successfully!");
    } catch (err) {
        console.error("Error while saving user:", err);
        res.status(500).send("Error:" + err);
    }
});


//login user
authRouter.post("/login", async (req, res) => {
    const { emailId, password } = req.body;
    console.log(req.body)
    try {
        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("Invalid Credentials!")
        }
        const isValidPassword = await user.validatePassword(password);
        if (isValidPassword) {
            //create JWT token
            const token = await user.getJWT();

            //AAdd the token to the cookie and send response back to the user
            res.cookie("token", token, {expires:new Date(Date.now() + 8 *3600000)})
            res.send("Login Successfully")
        } else {
            throw new Error("Invalid Credentials!")
        }

    } catch (err) {
        res.status(400).send("Error" + err.message)
    }
})

authRouter.post("/logout", async(req, res) => {
    res.cookie("token", "", {expires: new Date(Date.now())});
    res.send("Logout successfully...");
})

module.exports = authRouter;