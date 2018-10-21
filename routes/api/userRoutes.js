const express = require('express');
const router = express.Router();
const db = require('../../dataBase/db');

router.get('/api/users',function(req,res,next){
    let query = 'SELECT * from users';
    let users = db.select(query);
    if(users){
        res.status(200).json(JSON.parse(users));
    } else{
        res.status(400).json({msg:'Something went wrong'});
    }
});

module.exports = router;