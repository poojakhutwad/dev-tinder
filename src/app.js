const express = require("express");

const app = express() // creating the instance of an expressjs application i.e. creating new expressjs app

/**All these are same syntax for handling the routes i.e. syntax for route handlers 
   app.get("/user" , rh1, rh2, rh3, rh4, rh5)
   app.get("/user" , rh1, [rh2], rh3, rh4, rh5)
   app.get("/user" , rh1, [rh2, rh3, rh4], rh5)
   app.get("/user" , [rh1, [rh2], rh3, rh4, rh5])
*/
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