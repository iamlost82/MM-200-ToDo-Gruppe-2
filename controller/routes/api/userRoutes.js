const express = require('express');
const router = express.Router();
const db = require('../../../model/db');
const auth = require('../../routes/authenticate');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/api/user', function(req,res,next){
    if(req.body.username && req.body.email && req.body.password){
        let response = {};
        let inputData = {
            username: req.body.username,
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password
        };
        bcrypt.hash(inputData.password, saltRounds, async function(e, hash) {
            if(e){
                response.status = 500;
                response.return = {error:'Saving to database failed'};
            } else{
                inputData.pwhash = hash;
                let query = `INSERT INTO "public"."users_v2"(username, fullname, email, pwhash) 
                            VALUES($1, $2, $3, $4) 
                            RETURNING id,username,fullname,email,userrole`;
                let queryValues = [inputData.username,inputData.fullname,inputData.email,inputData.pwhash];
                try{
                    response = await db.insert(query,queryValues);
                    if(response.status === 200){
                        response.status = 201;
                    }
                } catch(err){
                    response.status = 500;
                    response.return = {error:'Saving to database failed'};
                }
            }
            res.status(response.status).json(response.return);
        });
    } else{
        res.status(400).json({error:'Error in input data, read API documentation'});
    }
});



router.put('/api/user',function(req,res,next){
    if(req.body.userid && req.body.username && req.body.email && req.body.password){
        let response = {};
        let inputData = {
            userid: req.body.userid,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };
        bcrypt.hash(inputData.password, saltRounds, async function(e, hash) {
            if(e){
                response.status = 500;
                response.return = {error:'Saving to database failed'};
            } else{
                inputData.pwhash = hash;
                let query = `UPDATE "public"."users" SET "username" = $1,
                                                         "email" = $2,
                                                         "pwhash" = $3 
                             WHERE userid = $4 
                             RETURNING userid,username,email,userrole`;
                let queryValues = [inputData.username,inputData.email,inputData.pwhash,inputData.userid];
                try{
                    response = await db.update(query,queryValues);
                    if(response.return.rowCount !== 1){
                        response.status = 400;
                        response.return = {error: 'Could not handle input'};
                    }
                } catch(err){
                    response.status = 500;
                    response.return = {error:'Saving to database failed'};
                }
            }
            res.status(response.status).json(response.return);
        });
    } else{
        res.status(400).json({error:'Error in input data, read API documentation'});
    }
});

router.delete('/api/user', async function(req,res,next){
    if(req.body.userid){
        let response = {};
        let userid = req.body.userid;
        let query = `UPDATE "public"."users" SET "active" = 0
        WHERE userid = $1 
        RETURNING userid,username,email,userrole,active`;
        let queryValues = [userid];
        try{
            response = await db.delete(query,queryValues);
            if(response.return.rowCount !== 1){
                response.status = 400;
                response.return = {error: 'Could not handle input'};
            }
        } catch(err){
            response.status = 500;
            response.return = {error:'Saving to database failed'};
        }
        res.status(response.status).json(response.return);
    } else{
        res.status(400).json({error:'Error in input data, read API documentation'});
    }
});

router.get('/api/users',auth,async function(req,res,next){
    let query = 'SELECT * from "public"."users"';
    let response = await db.select(query);
    //res.status(response.status).json(response.return);
    res.status(200).json(req.token);
});

module.exports = router;