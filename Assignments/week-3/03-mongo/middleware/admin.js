const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username=req.headers.username;
    const password= req.headers.password;
    try{
        const adminExisted = await Admin.findOne({username});
        if(adminExisted){
            if(adminExisted.password==password && adminExisted.username==username) next();
            else return res.status(401).json({ message:"Incorrect Credentails"});
        }
        else res.status(404).json({ message:" Admin Account don't exist in DataBase" });
    }catch(error){
        res.status(500).json({ message:`Internal Server Error : ${error}` });
    }
}

module.exports = adminMiddleware;