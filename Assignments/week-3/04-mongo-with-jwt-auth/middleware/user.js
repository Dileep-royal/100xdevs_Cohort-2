const jwt=require("jsonwebtoken");
const {userSecretKey} = require("../config");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token=req.headers.authorization.split(" ")[1];
    try{
        const decoded= await jwt.verify(token,userSecretKey);
        req.headers.username=decoded.username;
        next();
    }catch(error){
        res.status(401).json({message:"Token Expired or Invalid Token"});
    }
}

module.exports = userMiddleware;