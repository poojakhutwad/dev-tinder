const mongoose =  require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not Valid Email")
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter the Strong Password:"+value);
            }
        }
    },
    age:{
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Geneder is not valid data")
            }
        }
    },
    photoURL:{
        type:String,
        default: "https://www.istockphoto.com/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-gm1495088043-518213332"
    },
    about: {
        type: String,
        default:"This is default about the user"
    },
    skills: {
        type: [String]
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model("User", userSchema);