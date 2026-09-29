const express = require("express");
const connectDB = require("./config/database");

const User = require("./models/user");

const app = express() // creating the instance of an expressjs application i.e. creating new expressjs app
 
app.use(express.json()); // Add middleware

app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();

        console.log("User saved:", user);

        res.send("User Added successfully!");
    } catch (err) {
        console.error("Error while saving user:", err);
        res.status(500).send("Something went wrong");
    }
});

connectDB().then(() => {
    console.log("Database connection established");
    app.listen(7777, () => {
        console.log("Server is successfully listening on port 7777")
    })
})
.catch((err) => {
    console.error("Database cannot be connected")
})


// const {adminAuth, userAuth} = require("./middleware/auth")

// app.use("/admin", adminAuth);

// app.get("/admin/getAllData", (req,res) =>{
//     console.log("get All Data")
//     res.send("successful")
// });

// app.delete("/admin/deleteData", (req, res) => {
//     console.log("Deleted");
//     res.send("Data deleted successfully")
// })

// app.get("/user/login", (req, res) => {
//     res.send("Login successful")
// })

// app.get("/user", userAuth, (req,res) =>{
//     console.log("get All user Data")
//     res.send("successful")
// });

/**All these are same syntax for handling the routes i.e. syntax for route handlers 
   app.get("/user" , rh1, rh2, rh3, rh4, rh5)
   app.get("/user" , rh1, [rh2], rh3, rh4, rh5)
   app.get("/user" , rh1, [rh2, rh3, rh4], rh5)
   app.get("/user" , [rh1, [rh2], rh3, rh4, rh5])
app.get("/user",
    (req, res, next) => {
    console.log("Request Handler 1");
    //res.send({"firstName":"Pooja", "lastName":"Khutwad"})
    next()
    },
    (req, res,next) => {
        console.log("Request Handler 2")
      
      
       // res.send({"firstName":"Pooja2", "lastName":"Khutwad"})
         next()
    },
    (req, res, next) => {
        console.log("hello")
        res.send("Done")
    }
)
    */ 

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
// app.use("/test",(req, res) => {
//     res.send("Hello From home page...")
// });

// app.listen(3000, () => {
//     console.log("Server is listening on port 3000")
// });