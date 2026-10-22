const mongoose =  require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
});

//if you have query like User.findOne(firstName:"ppoja" , lastName: "khutwad")
//then we can make the query optimized by using the index like below which makes it faster
//below we add indexes for firstNAme and lastName  which is called as adding compound indexes
userSchema.index({firstName: 1, lastName: 1})

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id: user._id}, "devTinder@22",{expiresIn: "7d"});
    return token;
}

userSchema.methods.validatePassword =  async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;
    const isValidPassword = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isValidPassword;
}

module.exports = mongoose.model("User", userSchema);