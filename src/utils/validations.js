const validator =  require("validator");
const Validator = (req) => {
   const {firstName, lastName, emailId, password} = req?.body;

   if(!firstName){
     throw new Error("Enter the Firstname")
   }
   if(!lastName){
     throw new Error("Enter the Last name")
   }
   if(!validator.isEmail(emailId)){
     throw new Error("Enter the valid Email id")
   }
   if(!validator.isStrongPassword(password)){
     throw new Error("Password should be Strong")
   }
}

module.exports = {Validator}