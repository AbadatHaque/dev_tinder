const express = require('express');
const connectDb = require('./config/database.js')
const userSchema = require('./models/user.js')

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

app.post('/singup',async (req,res)=>{
    const singUpData = {
        name:'Rohit sharma',
        age:37,
        gender:'male',
        email:'rohit@gmail.com'
    };
    const userSingUpData = new userSchema(singUpData);
    try{
        await userSingUpData.save();
        res.send('successfully add data')
    }catch(err){
        res.status('500').send('Unsuccess to add data')
    }
})




app.get('/', (req,res)=>{
    // throw new Error('i am error');
    console.log('from get root')
    res.send('Now u r in root path')
})
app.use('/',(err,req,res,next)=>{
    console.log('hey i am from use');
    if(err){
        console.error(' i got error')
        // return false
    }
    // next()
})

// app.get('/list',(req,res)=>{
//     console.log('here is your all list');
//     res.send('here is your all list')
// })
// app.post('/add',(req,res)=>{
//     res.send('Add successfully')
// })
// app.put('/replace',(req,res)=>{
//     res.send('All data replace successfully')
// })
// app.patch('/update',(req,res)=>{
//     res.send('Update successfully')
// })

app.delete('/delete',(req,res)=>{
    res.send('delete user successfully')
})