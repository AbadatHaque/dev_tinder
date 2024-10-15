const express = require("express");
const authRouter = express();
const {isStringPassword,encriptPassword, matchPassword} = require("../utils/validations")
const userSchema = require("../models/user")
const jwt = require("jsonwebtoken")
const privateKey = 'privateKey123'

authRouter.use(express.json());
// Sing up Api
authRouter.post('/singup',async (req,res)=>{
    try{
        console.log('welcome to singup api')
        // check strong password - encript password - store data inside db
        const {password} = req.body;
        isStringPassword(password);
       const encPass = await encriptPassword(password);
       req.body.password = encPass;
       const singupData =  await new userSchema(req.body);
       singupData.save()
        res.json({
            message:'Successfully sing up',
            user:req.body
        })

    }catch(err){
        res.status(400).json({message:err.message  })
    }
})

// Log in Api

authRouter.post('/login',async (req,res)=>{
    try{
        //  get user from db by email  - check password match
        //  - create jwt token - send token
        const {email,password} = req.body;
        const user = await userSchema.findOne({email});
        if(!user){
            throw new Error('Wrong user credential');
        };
        await matchPassword(user.password,password);
        const token =  await jwt.sign({_id:user._id}, privateKey,{expiresIn:'1d'})
        res.cookie("token",token).json({message: user.name+' Contratulation you are login'})
    }catch(err){
        res.status(400).json({message:err.message|err })
    }
})

module.exports = authRouter;