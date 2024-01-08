const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course }=require("../db/index");
const inputCredentailsValidatorMiddleware=require("../middleware/inputValidator")
const jwt=require("jsonwebtoken");

const {userSecretKey} = require("../config");

// User Routes
router.post('/signup',inputCredentailsValidatorMiddleware, async(req, res) => {
    // Implement user signup logic
    const username=req.body.username;
    const password= req.body.password;
    try{
        const userExisted = await User.findOne({ username});
        if(userExisted) return res.status(409).json({ message:"User account already exist with this username in Database" });
        const newUser = new User({ username, password});
        const userSaved= await newUser.save();
        if(userSaved) return res.status(200).json({ message: 'User created successfully'});
        }catch(error){
            return res.status(500).json({ message:`Internal Server Error : ${error}` });
        }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username= req.body.username;
    const password= req.body.password;
    try{
        const user= await User.findOne({username,password});
        if(!user) return res.status(401).json({message:"Login credentails are incorrect"});
        const payload={username};
        const options={expiresIn:'2h'};
        const token=jwt.sign(payload,userSecretKey,options);
        res.status(200).json({token});
    }catch(error){
       res.status(500).json({message:`Internal Server Error : ${error}`});
    }
});

router.use(userMiddleware);
router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    try{
        const listOfCourses = await Course.find({}).exec();
        res.status(200).json({courses:listOfCourses});
    }catch(error){
        res.status(500).json({ message: `Error ocuured while retriving courses : ${error}`})
    }
});

router.post('/courses/:courseId',async (req, res) => {
    // Implement course purchase logic
    try{

        const id=req.params.courseId;
        const username=req.headers.username;
        const sucess = await User.updateOne({ username,
            $push:{
               purchasedCourses:id
            }
      });
        if(sucess) res.status(200).json({message: 'Course purchased successfully'});
    }catch(error){
        res.status(500).json({ message: `Error ocuured while retriving course with ${id} : ${error}`})
    }
});

router.get('/purchasedCourses',async(req, res) => {
    // Implement fetching purchased courses logic
    try{
        const username=req.headers.username;
        const requiredUser= await User.findOne({ username });
        if(requiredUser){
        const listOfPurchasedCourses=requiredUser.purchasedCourses;
        const response=await Course.find({
          _id:{
            $in:listOfPurchasedCourses
          }
        });
        res.status(200).json({purchasedCourses:response});
        }
        
    }catch(error){
        res.status(500).json({ message: `Error ocuured while retriving Purchased course(s) : ${error}`})
    }
});

module.exports = {
    userRouter:router,
    }