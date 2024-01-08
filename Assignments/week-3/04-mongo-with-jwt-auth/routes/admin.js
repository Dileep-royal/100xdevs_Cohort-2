const { Router } = require("express");
const jwt =require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");
const inputCredentailsValidatorMiddleware=require("../middleware/inputValidator")
const { Admin, Course }=require("../db/index");
const router = Router();
const {adminSecretKey} = require("../config");

// Admin Routes
router.post('/signup',inputCredentailsValidatorMiddleware, async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password= req.body.password;
    try{
    const adminExisted = await Admin.findOne({ username});
    if(adminExisted) return res.status(409).json({ message:"Admin account already exist with this username in Database" });
    const newAdmin = new Admin({ username, password});
    const adminSaved= await newAdmin.save();
    if(adminSaved) return res.status(200).json({ message: 'Admin created successfully'});
    // else return res.status(422).json({ message:'Failed to create a new Admin account'});
    }catch(error){
        return res.status(500).json({ message:`Internal Server Error : ${error}` });
    }
});


router.post('/signin',async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password= req.body.password;
    try{
        const admin= await Admin.findOne({username,password});
        console.log(admin);
        if(!admin) return res.status(401).json({message:"Login credentails are incorrect"});
        const payload={username};
        const options={expiresIn:'2h'};
        const token=jwt.sign(payload,adminSecretKey,options);
        res.status(200).json({token});
    }catch(error){
       res.status(500).json({message:`Internal Server Error : ${error}`});
    }
});

router.use(adminMiddleware);
router.post('/courses',async(req, res) => {
    // Implement course creation logic
    const title= req.body.title;
    const description= req.body.description;
    const price= parseInt(req.body.price);
    const imageLink = req.body.imageLink;
    
    const newCourse = new Course( { title, description, price, imageLink });
    try{
    const courseSaved = await newCourse.save();
    if(courseSaved) res.status(200).json({ message: 'Course created successfully', courseId: `${newCourse._id}` });
    // else return res.status(422).json({ message:'Failed to create a new course'});
    }catch(error){
        res.status(500).json({message:`Error occured while creating a new course : ${error}`});
    }
});

router.get('/courses', async(req, res) => {
    // Implement fetching all courses logic
    try{
        const listOfCourses = await Course.find({}).exec();
        if(listOfCourses) return res.status(200).json({course:listOfCourses});
        // else return res.status(422).json({ message:'Failed to details of courses'});
    }catch(error){
        res.status(411).json({ message: `Error ocuured while retriving all courses : ${error}`})
    }
});

module.exports = {
    adminRouter:router,
};