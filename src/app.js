const express = require("express");
const connectDB = require("./config/database");

const User = require("./models/user");
const {Validator} = require("./utils/validations")
const bcrypt = require("bcrypt");

const app = express() // creating the instance of an expressjs application i.e. creating new expressjs app
 
app.use(express.json()); // Add middleware

app.post("/signup", async (req, res) => {
     try {
    //validation of data
    Validator(req);

    const {firstName, lastName, emailId, password} = req.body;

    //encrpt the password using bcrypt library
    const passwordHash = await bcrypt.hash(password, 10)
    console.log(passwordHash);

    //create new instance of user model
    const user =  new User({
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
        res.status(500).send("Error:"+err);
    }
});

//get user by email id
 app.get("/user", async(req, res) => {
    const emailId =  req.body.emailId;
    try{

      const users = await User.find({emailId: emailId});
      if(!users){
        res.status(404).send("User not found")
      }
      else{
        res.send(users);
      }
      

    }catch(err){
        res.status(500).send("Something went wrong")
    }
 })

 //get all users
 app.get("/feed" , async(req, res) => {
    try{
        const Allusers = await User.find({})
        if(!Allusers){
            res.status(404).send("User not Found")
        }
        else{
            res.send(Allusers)
        }
    }
    catch(err){
        res.status(500).send("Something went weong")
    }
 })

 //delete the USers
 app.delete("/user", async(req, res) => {
    const id = req.body.id
    console.log(id)
    try{
        const data = await User.findByIdAndDelete(id) 
        res.send("User deleted succeessfully")
    }
    catch(err){
        res.status(500).send("Something went wrong")
    }
 })

 //update the user
 app.patch("/user/:userId", async(req, res) => {
    const userId =  req.params?.userId;
    const data =  req.body
    try{
       const ALLOWEDUPDATES = ["photoUrl","about","gender","age","skills"];
       const isUpdateAllowed = Object.keys(data).every((k) => ALLOWEDUPDATES.includes(k));
       if(!isUpdateAllowed){
         throw new Error("Update not allowed")
       }
       if(data?.skills.length > 10){
        throw new Error("Skiils can not be more than 10")
       }
       const user =  await User.findByIdAndUpdate({"_id": userId}, data, {returnDocument:'after', runValidators: true})
       console.log(user)
        res.send("Updated successfully")

    }catch(err){
        console.log(err)
        res.status(500).send("Something went wrong"+err)
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