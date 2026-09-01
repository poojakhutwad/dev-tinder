const express = require("express");

const app = express() // creating the instance of an expressjs application i.e. creating new expressjs app

app.get("/user/:userId/:name/:password",(req, res) => {
    console.log(req.params);
    res.send({"firstName":"Pooja", "lastName":"Khutwad"})
})
// app.get("/user",(req, res) => {
//     res.send({"firstName":"Pooja", "lastName":"Khutwad"})
// })

// app.post("/user",(req, res) => {
//     //Save data to DB
//     res.send("Data saved successfully");
// })

// app.delete("/user",(req, res)=> {
//     res.send("Deleted Succeessfully!")
// })

// app.patch("/user",(req, res) => {
//     res.send("Updated Successfully!")
// })
app.use("/test",(req, res) => {
    res.send("Hello From home page...")
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000")
});