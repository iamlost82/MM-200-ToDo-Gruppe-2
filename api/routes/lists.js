const express = require('express');
const router = express.Router();

const lists = [
    {id:1,title:"Fluffylist",owner:"1"},
    {id:2,title:"Flappylist",owner:"2"},
    {id:3,title:"Floffylist",owner:"3"}
]

router.get('/', (req,res) => {
    res.status(200).json(lists).end();
});

router.post('/create',(req,res) =>{
    if(true === true){
        res.status(201).json({msg:"List created"}).end();
    } else{
        res.status(400).json({msg:"List creation failed"}).end();
    }
});

module.exports = router;