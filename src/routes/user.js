const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();
const User =  require("../models/user")

userRouter.get("/user/requests/received", userAuth, async (req , res) => {
    try{
        const loggedInUser = req.user;
        console.log(loggedInUser)
        const connectionRequest =  await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
            
         }).populate("fromUserId", "firstName lastName photoURL about skills") //Populate is used to populate the ref collection data here
         //in connectionRequest we are refering fromUserId of the User collection so after populate it will give us data from user collection
         // so here we want  firstName, lastName, gender, photoUrl, age so we can write it in 2 ways like below
         //1.populate("fromUserId", "firstName lastName gender photoUrl age") => fields we want seperated by space
         //2.populate("fromUserId", [firstName, lastName, gender, photoUrl, age]) =>  field we want in an array
         //Inshort populate is like Joins in SQL , innerJoin, outerJoin like that 

         res.json({
            message:"Data fetched successfully...",
            data: connectionRequest
         })

    }catch(err){
        res.status(400).send("ERROR:" + err.message);
    }
})

const USER_SAFE_DATA = "firstName lastName photoURL about skills"

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            $or:[
                { toUserId: loggedInUser._id, status:"accepted"},
                { fromUserId: loggedInUser._id, status: "accepted"}
            ]
        })
        .populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA)

        const data = connectionRequest.map((row) => {
            console.log("row",row)
            if(loggedInUser._id.toString() === row.fromUserId){
                return row.toUserId;
            }
            return row.fromUserId
        });

        res.json({ data })
    }catch(error){
        res.status(400).send("ERROR: "+err.message);
    }

})

userRouter.get("/feed", userAuth, async (req, res) => {
    try{
        //User should see all the user cars except
        //1.his own card
        //2.his connections
        //3.ignore people
        //4.already sent the connection request
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;

        const skip = (page - 1) * limit;

        const connectionRequest =  await ConnectionRequest.find({
            $or: [{ fromUserId: loggedInUser._id }, { toUserId : loggedInUser._id}]
        }).select("fromUserId toUserId");

        const hideUsersFromFeed =  new Set();
        connectionRequest.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });

        const users =  await User.find({
            $and: [
                {_id: { $nin: Array.from(hideUsersFromFeed)}},
                {_id: { $ne: loggedInUser._id}}
            ]
            
        }).select(USER_SAFE_DATA).skip(skip).limit(limit) //skip and limit functions are used to add pagination
        res.json({data : users})



    }catch(error){
        res.status(500).send("ERROR: "+error.message)
    }
})


module.exports = userRouter;