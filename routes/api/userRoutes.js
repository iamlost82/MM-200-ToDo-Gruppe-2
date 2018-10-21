const express = require('express');
const router = express.Router();
const db = require('../../dataBase/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/api/user', function(req,res,next){
    bcrypt.hash(req.body.userpwplain, saltRounds, async function(err, hash) {
        let username = req.body.username;
        let useremail = req.body.useremail;
        let userrole = req.body.userrole;
        let userpwhash = hash;
        let query = `INSERT INTO users(username,useremail,userrole,userpwhash) 
                     VALUES('${username}','${useremail}','${userrole}','${userpwhash}') 
                     RETURNING userid,username,useremail,userrole,userpwhash`;
        let queryresult = await db.insert(query);
        let response = {status:501, result: 'Sorry, request failed'};
        if(queryresult.detail){
            response = {status: 500, result: {msg:queryresult.detail}};
        }
        else if(queryresult.rowCount === 1){
            response = {status: 201, result: queryresult.rows};
        } else{
            response = {status:501, result: 'Sorry, request failed'};
        }
        res.status(response.status).json(response.result);
    });
});

router.post('/api/user/auth', function(req,res,next){

});

router.put('/api/user',function(req,res,next){
    bcrypt.hash(req.body.userpwplain, saltRounds, async function(err, hash) {
        let userid = req.body.userid;
        let username = req.body.username;
        let useremail = req.body.useremail;
        let userrole = req.body.userrole;
        let userpwhash = hash;
        let query = `UPDATE "public"."users" SET "username" = '${username}',
                                                "useremail" = '${useremail}',
                                                "userrole" = ${userrole},
                                                "userpwhash" = '${userpwhash}' 
                    WHERE userid = ${userid} 
                    RETURNING userid,username,useremail,userrole,userpwhash`;
        let queryresult = await db.insert(query);
        let response = {status:500, result: {msg:'Something went wrong'}};
        if(queryresult.detail){
            response = {status: 500, result: {msg:queryresult.detail}};
        }
        else if(queryresult.rowCount === 1){
            response = {status: 200, result: queryresult.rows};
        } else {
            response = {status:500, result: {msg:'Something went wrong'}};
        }
        res.status(response.status).json(response.result);
    });
});

router.delete('/api/user', async function(req,res,next){
    let userid = req.body.userid;
    let query = `DELETE FROM "public"."users" WHERE userid = ${userid}`;
    let queryresult = await db.delete(query);
    let response = {status: 500, result: {msg:'Something went wrong'}};
    if(queryresult.detail){
        response = {status: 500, result: {msg:queryresult.detail}};
    }
    else if(queryresult.rowCount === 1){
        response = {status: 200, result: {msg:'User deleted'}};
    } else{
        response = {status: 500, result: {msg:'Something went wrong'}};
    }
    res.status(response.status).json(response.result);
});

router.get('/api/users',async function(req,res,next){
    let query = 'SELECT * from users';
    let queryresult = await db.select(query);
    let response = {status:500, result: {msg:'Something went wrong'}};
    if(queryresult.detail){
        response = {status: 500, result: {msg:queryresult.detail}};
    }
    else if(queryresult.rowCount > 0){
        response = {status: 200, result: queryresult.rows};
    }
    res.status(response.status).json(response.result);
});

module.exports = router;