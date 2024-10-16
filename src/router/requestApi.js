const express = require("express");
const cookieParser = require("cookie-parser")
const {tokenValidation} = require("../middleware/auth0");
const requestSchema = require("../models/requestModel")
const userSchema = require("../models/user")

const requestApi = express();

requestApi.use('/',cookieParser());
requestApi.use('/',express.json());
requestApi.post('/request/:status',tokenValidation,async(req,res)=>{
    try{// check status- send and recive id is exit user  - add .
    const {senderId,receiverId} = req.body;
    const isExitSendId = await userSchema.findById(senderId);
    const isExitReciverId = await userSchema.findById(receiverId);
    if(!isExitSendId || !isExitReciverId){
       const msg =  isExitReciverId ? 'Sender id is not exit' : 'Receiver id is not exit';
        throw new Error(msg);
    }
    const acceptedStatus = ['intrested','ignored'];
    const status = req.params.status;
    console.log(status)
    if(!acceptedStatus.includes(status)){
        throw new Error('Please send a currect status value .')
    };
    req.body.status = status;
    const addRequestData =  new requestSchema(req.body);
    console.log(addRequestData)
    await addRequestData.save()
    res.json({
        message:'Successfully send',
    })
    }catch(err){
        res.status(400).json({message:err.message})
    }


})

module.exports = requestApi