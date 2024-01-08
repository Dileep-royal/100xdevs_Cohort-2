const { User } = require("../db");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username=req.headers.username;
    const password= req.headers.password;
    try{
        const userExisted = await User.findOne({ username});
        if(userExisted){
            if(userExisted.password===password && userExisted.username===username) next();
            else return res.status(401).json({ message:"Incorrect Credentails"});
        }
        else res.status(404).json({ message:" User Account don't exist in DataBase" })
    }catch(error){
        res.status(500).json({ message:`Internal Server Error : ${error}` });
    }

}

module.exports = userMiddleware;