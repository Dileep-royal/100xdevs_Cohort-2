const jwt=require("jsonwebtoken");
const {adminSecretKey} = require("../config");
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token=req.headers.authorization .split(" ")[1];
    try{
        const decoded=jwt.verify(token,adminSecretKey);
        // req.username=decoded.username;
        next();
    }catch(error){
        res.status(401).json({message:"Token Expired or Invalid Token "});
    }
}

module.exports = adminMiddleware;