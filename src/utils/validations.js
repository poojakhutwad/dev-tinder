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

const validateEditUser = (req) => {
  const allowedEditFields = ["firstName", "lastName","emailId", "photoUrl","gender","age","about","skills"];
  const isEditAllowed = Object.keys(req.body).every(field =>  allowedEditFields.includes(field));
  return isEditAllowed;
}

const validateForgotPassword = (req) => {
  const isEditPasswordAllowed = Object.keys(req.body).every(field => field === "password");
  return password;
}

module.exports = {Validator, validateEditUser, validateForgotPassword}