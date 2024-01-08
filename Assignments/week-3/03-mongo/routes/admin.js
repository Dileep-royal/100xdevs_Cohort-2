const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const inputCredentialsValidatorMiddleware=require("../middleware/inputValidator")
const { Admin, Course } = require("../db/index")
const router = Router();

// Admin Routes
router.post('/signup',inputCredentialsValidatorMiddleware, async (req, res) => {
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

// router.use(adminMiddleware)
router.post('/courses',adminMiddleware, async (req, res) => {
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

router.get('/courses',adminMiddleware, async (req, res) => {
    try{
        const listOfCourses = await Course.find({}).exec();
        if(listOfCourses) return res.status(200).json({course:listOfCourses});
        // else return res.status(422).json({ message:'Failed to details of courses'});
    }catch(error){
        res.status(411).json({ message: `Error ocuured while retriving all courses : ${error}`})
    }
});

module.exports = router;