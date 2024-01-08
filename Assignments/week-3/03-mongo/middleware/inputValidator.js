const zod=require("zod");

function inputCredentailsValidatorMiddleware(req,res,next){
    const username=req.body.username;
    const password=req.body.password;

    emailSchema=zod.string().email();
    passwordSchema=zod.string().min(6);
    if(!emailSchema.safeParse(username).success || !passwordSchema.safeParse(password).success){
       return res.status(422).json({ message:"provided credentials do not meet the Specified validation criteria"});
    }
    next();

}

module.exports=inputCredentailsValidatorMiddleware;