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
    res.send('here is dur all list')
});



console.log('run node js')