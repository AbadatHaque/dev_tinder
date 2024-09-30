const express = require('express');
const connectDb = require('./config/database.js')
const userSchema = require('./models/user.js')
const {singUpValidation,passwordValidation,matchPassword} = require('./utils/validations.js')

const app =express();
// CONNECT TO DB;
connectDb().then(()=>{
    // Run Server
    app.listen('4200',()=>{
        console.log('run successfully server'); 
    });    
}).catch((err)=>{
    console.error('Got error', err);
})

app.use(express.json())

app.post('/singup',async (req,res)=>{
    try{
        singUpValidation(req.body)
       const password = await passwordValidation(req.body.password);
       req.body.password = password;
        const userSingUpData = new userSchema(req.body);
        await userSingUpData.save();
        res.send('successfully add data')
    }catch(err){
        res.status('500').send('Unsuccess to add data' + err)
    }
})
app.post('/login',async (req,res)=>{
    try{
        const user = await userSchema.findOne({email:req.body.email});
        if(!user){
            throw new Error('User cradential wrong');
        }
        await  matchPassword(user.password,req.body.password);
        res.send('Successfully login')
    }catch(err){
        res.status(400).send('err is' + err)
    }
})

app.get('/feed',async (req,res)=>{
    try{
        const feedData = await userSchema.find({});
        res.send(feedData)
    }catch(err){
        res.status(400).send('Not able to get feed data');
    }
})


app.delete('/delete',async(req,res)=>{
    const userId = req.body.id;
    try{
        const data = await userSchema.findOneAndDelete({_id:userId});
        res.send(data);
    }catch(err){
        res.status(400).send('Got error to delete user .')
    }
})

app.patch('/update', async(req,res)=>{
    try{
        const updateDate = await userSchema.findOneAndUpdate(req.body.findBy,req.body.apply,{new:true} );
        res.send(updateDate)
    }catch(err){
        console.error('Got error to update Profile')
    }
})

