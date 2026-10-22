const mongoose =  require("mongoose");

const connectionRequestSchema =  new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status:{
        type: String,
        required: true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message: `{VALUE} is incorrect status type`
        }
    }
},{
    timestamps: true
});

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 })

connectionRequestSchema.pre("save", function(){
    const connectionRequest = this;

    //check if the fromUserID is same as toUserId
    //Note: its not mandetory to check this validation here you can chk it at api level also in request.js file
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("You can not send request to yourself")
    }
    //next();
})

const ConnectionRequestModel =  new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);

module.exports = ConnectionRequestModel;