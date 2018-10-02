const express = require('express');
const router = express.Router();

const elements = [
    {id:1,heading:"Fluffystuff",body:"My list element",owner:"1",list:"1"},
    {id:2,heading:"Flappystuff",body:"My list element",owner:"2",list:"2"},
    {id:3,heading:"Flippystuff",body:"My list element",owner:"3",list:"3"}
]

router.get('/', (req,res) => {
    res.status(200).json(elements).end();
});

router.post('/create',(req,res) =>{
    if(true === true){
        res.status(201).json({msg:"Element created"}).end();
    } else{
        res.status(400).json({msg:"Element creation failed"}).end();
    }
});

module.exports = router;