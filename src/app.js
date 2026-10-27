const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const connectDB = require("./config/database");

const User = require("./models/user");
const { Validator } = require("./utils/validations")
const bcrypt = require("bcrypt");
const { userAuth } = require("./middleware/auth");
const authRouter = require("./routes/auth");
const profileRouter =  require("./routes/profile");
const requestsRouter = require("./routes/requests");
const userRouter = require("./routes/user");

const app = express() // creating the instance of an expressjs application i.e. creating new expressjs app

app.use(express.json()); // Add middleware
app.use(cookieParser())

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestsRouter);
app.use("/", userRouter);

//update the user
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body
    try {
        const ALLOWEDUPDATES = ["photoUrl", "about", "gender", "age", "skills"];
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWEDUPDATES.includes(k));
        if (!isUpdateAllowed) {
            throw new Error("Update not allowed")
        }
        if (data?.skills.length > 10) {
            throw new Error("Skiils can not be more than 10")
        }
        const user = await User.findByIdAndUpdate({ "_id": userId }, data, { returnDocument: 'after', runValidators: true })
        console.log(user)
        res.send("Updated successfully")

    } catch (err) {
        console.log(err)
        res.status(500).send("Something went wrong" + err)
    }
})
connectDB().then(() => {
    console.log("Database connection established");
    app.listen(7777, () => {
        console.log("Server is successfully listening on port 7777")
    })
})
    .catch((err) => {
        console.error("Database cannot be connected")
    })
