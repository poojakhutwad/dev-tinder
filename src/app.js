const express = require("express");

const app = express() // creating the instance of an expressjs application i.e. creating new expressjs app



app.use("/home",(req, res) => {
    res.send("Hello From home page...")
});

app.use("/",(req, res) => {
    res.send("Hello From Server dashobard...")
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
});