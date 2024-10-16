const express = require("express");
const cookieParser = require("cookie-parser")
const {tokenValidation} = require("../middleware/auth0");
const requestSchema = require("../models/requestModel")

const requestApi = express();

requestApi.use('/',cookieParser());
requestApi.use('/',express.json());
requestApi.post('/request/:status',tokenValidation,async(req,res)=>{
    try{// check status- send and recive id is exit user  - add .
    const {senderId,receiverId} = req.body;
    const acceptedStatus = ['intrested','ignored'];
    const status = req.body;
    if(acceptedStatus.includes(status)){
        throw new Error('Please send a currect status value .')
    };
    const isExitSendId = await requestSchema.findById(senderId);
    const isExitReciverId = await requestSchema.findById(receiverId);
    if(!isExitSendId || !isExitReciverId){
       const meg =  isExitReciverId ? 'Sender id is not exit' : 'Receiver is not exit';
        throw new Error(msg);
    }
    const addRequestData = new requestSchema(req.body);
    }catch(err){
        res.status(400).json(err)
    }


})

module.exports = requestApi