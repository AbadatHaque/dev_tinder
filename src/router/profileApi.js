const express = require("express");
const userSchema = require('../models/user');
const {tokenValidation} = require("../middleware/auth0")
const cookieParser = require("cookie-parser")
const profileApi = express();

profileApi.use(express.json())
profileApi.use(cookieParser())

profileApi.post('/profile/view',tokenValidation,async(req,res)=>{
    try{
        const {id} = req.body;
        const user = await  userSchema.findById(id);
        if(!user){
            throw new Error('User not found .')
        }
        res.json({message:'Successfully get data',
            data:user
        })
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

profileApi.patch('/profile/edit',tokenValidation,async (req,res)=>{
    try{
        // user valid by id -  editable key - update;
       const editableKeys= ['age','name','id','gender'];
        const {id} = req.body;
        const user = await userSchema.findById(id);
        if(!user){
            throw new Error('User not found .');
        };
       const isWrongKeyUpdate = Object.keys(req.body).every((item)=> editableKeys.includes(item));
       if(!isWrongKeyUpdate){
            throw new Error('Wrong key update')
        }
        await userSchema.findByIdAndUpdate(id,req.body);
        res.json({'message': 'Successfully updte user details'})
    }catch(err){
        res.status(400).json({"message":err.message})
    }
});



module.exports= profileApi;