const express =  require("express");
const requestsRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest= require("../models/connectionRequest");
const User = require("../models/user");
requestsRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
   try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message:"Invalid status type: "+status
            })
        }
 
        //To Check whether the toUser is present in database or not
        const toUser =  await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({
                message:"User not found"
            })
        }
      
        const existingConnectionRequest =  await ConnectionRequest.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]
        });

        if(existingConnectionRequest){
            return res.status(400).send({
                message: "Connection Request Already Exists"
            })
        }
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        const data = await connectionRequest.save();

        if (status === "interested") {
            message = `${req.user.firstName} sent a connection request to ${toUser.firstName}`;
        } else if (status === "ignored") {
            message = `${req.user.firstName} ignored ${toUser.firstName}'s connection request`;
        } else if (status === "accepted") {
            message = `${req.user.firstName} accepted ${toUser.firstName}'s connection request`;
        }


        res.json({
            message,
            data
        });

    }catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
})

requestsRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        const allowedStatus = [ "accepted", "rejected"];
        if(!allowedStatus.includes(status)){
            return  res.status(400).json({
                message: "Status not allowed"
            })
        }
        console.log(loggedInUser)
        console.log(status, requestId )
        const connectionReuest =  await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested"
        })
        console.log(connectionReuest)

        if(!connectionReuest){
            return res.status(404).json({
                message: "Connection Request not found"
            })
        }

        connectionReuest.status = status;
        const data =  await connectionReuest.save();
        res.json({message: "Coonection request " + status , data})

    }catch(err){
        res.status(500).send("Error"+err.message);
    }
})
module.exports = requestsRouter