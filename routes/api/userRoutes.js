const express = require('express');
const router = express.Router();
const db = require('../../dataBase/db');

router.get('/api/users',async function(req,res,next){
    let query = 'SELECT * from users';
    let users = await db.select(query);
    res.status(200).json(users);
});

module.exports = router;