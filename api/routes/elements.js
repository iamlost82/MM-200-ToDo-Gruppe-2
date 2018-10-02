const express = require('express');
const router = express.Router();

const users = [
    {id:1,name:"Fluffy",email:"fluffy@uia.no",password:"123456"},
    {id:2,name:"Flappy",email:"flappy@uia.no",password:"123456"},
    {id:3,name:"Floppy",email:"floppy@uia.no",password:"123456"}
]

router.get('/', (req,res) => {
    res.status(200).json(users).end();
});

router.post('/create',(req,res) =>{
    if(validateUserCreationInput() === true){
        res.status(201).json({msg:"User created"}).end();
    } else{
        res.status(400).json({msg:"User creation failed"}).end();
    }
})

router.post('/auth',(req,res) =>{
    if(validateUserAuthInput() === true){
        res.status(200).json({msg:"User logged in"}).end();
    } else{
        res.status(401).json({msg:"Unauthorized user"}).end();
    }
})



module.exports = router;

function validateUserAuthInput(){
    //todo..validate user input
    return true;
}

function validateUserCreationInput(){
    //todo..validate user input
    return true;
}