const express = require('express');

const app =express();

app.listen('4200',()=>{
    console.log('run successfully server');
});

app.get('/', (req,res)=>{
    res.send('Now u r in root path')
})
app.get('/list',(req,res)=>{
    console.log('here is your all list');
    res.send('here is your all list')
})
app.post('/add',(req,res)=>{
    res.send('Add successfully')
})
app.put('/replace',(req,res)=>{
    res.send('All data replace successfully')
})
app.patch('/update',(req,res)=>{
    res.send('Update successfully')
})

app.delete('/delete',(req,res)=>{
    res.send('delete user successfully')
})