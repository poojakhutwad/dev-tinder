const adminAuth = (req, res, next) => {
    console.log("Middleware for admin auth")
    let token = "pooja"
    const isAuthenticated = token === "pooja" 
    if(!isAuthenticated){
      res.send("User is not Authenticated")
    }
    else{
        next()
    }
}

const userAuth = (req, res, next) => {
    let token = "Pooja"
    const isAuthenticated = token === "Pooja"
    if(!isAuthenticated){
        res.status(401).send("Not autthenticated")
    }
    else{
        next()
    }
}

module.exports = {
    adminAuth,
    userAuth
}