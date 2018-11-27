const DEBUG = false;

const express = require('express');
const router = express.Router();
const db = require('../../../model/db');
const auth = require('../../routes/authenticate');
const inputvalidator = require('../../userInputValidator');
const admOrSelf = require('../../admOrSelf');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

router.post('/api/user', function (req, res, next) {
    req.expInput = ['username', 'email', 'password'];
    next();
}, inputvalidator, function (req, res, next) {
    let response = {};
    let inputData = {
        username: req.body.username.toLowerCase(),
        fullname: req.body.fullname,
        email: req.body.email.toLowerCase(),
        password: req.body.password
    };
    bcrypt.hash(inputData.password, saltRounds, async function (e, hash) {
        if (e) {
            response.status = 500;
            response.return = { error: 'Saving to database failed' };
        } else {
            inputData.pwhash = hash;
            let query = `INSERT INTO "public"."users_v2"(username, fullname, email, pwhash) 
                            VALUES($1, $2, $3, $4) 
                            RETURNING id,username,fullname,email,userrole`;
            let queryValues = [inputData.username, inputData.fullname, inputData.email, inputData.pwhash];
            try {
                response = await db.insert(query, queryValues);
                if (response.status === 200) {
                    response.status = 201;
                }
            } catch (err) {
                response.status = 500;
                response.return = { error: 'Saving to database failed' };
            }
        }
        res.status(response.status).json(response.return);
    });
});



router.put('/api/user', function (req, res, next) {
    req.expInput = ['id', 'email', 'password'];
    next();
}, inputvalidator, auth, admOrSelf, function (req, res, next) {
    let response = {};
    let inputData = {
        id: req.token.id,
        fullname: req.body.fullname,
        email: req.body.email.toLowerCase(),
        password: req.body.password
    };
    bcrypt.hash(inputData.password, saltRounds, async function (e, hash) {
        if (e) {
            response.status = 500;
            response.return = { error: 'Saving to database failed' };
        } else {
            inputData.pwhash = hash;
            let query = `UPDATE "public"."users_v2" SET 
                                                         "fullname" = $1,
                                                         "email" = $2,
                                                         "pwhash" = $3 
                             WHERE id = $4 
                             RETURNING id,username,fullname,email,userrole`;
            let queryValues = [inputData.fullname, inputData.email, inputData.pwhash, inputData.id];
            try {
                response = await db.update(query, queryValues);
                if (response.return.rowCount !== 1) {
                    response.status = 400;
                    response.return = { error: 'Could not handle input' };
                }
            } catch (err) {
                response.status = 500;
                response.return = { error: 'Saving to database failed' };
            }
        }
        res.status(response.status).json(response.return);
    });
});

router.delete('/api/user', function (req, res, next) {
    req.expInput = ['id'];
    next();
}, inputvalidator, auth, async function (req, res, next) {
    let response = {};
    let id = req.body.id;
    let query = `UPDATE "public"."users_v2" SET "active" = 0
        WHERE id = $1 
        RETURNING id,username,fullname,email,userrole,active`;
    let queryValues = [id];
    try {
        response = await db.delete(query, queryValues);
        if (response.return.rowCount !== 1) {
            response.status = 400;
            response.return = { error: 'Could not handle input' };
        }
    } catch (err) {
        response.status = 500;
        response.return = { error: 'Saving to database failed' };
    }
    res.status(response.status).json(response.return);
});

router.get('/api/users',auth,async function(req,res,next){
    if(req.token.userrole === 99){
        let query = 'SELECT id,username,fullname,email,userrole,lastlogin,active from "public"."users_v2"';
        let response = await db.select(query);
        res.status(response.status).json(response.return);
    } else{
        res.status(403).json({msg:'Action not allowed'})
    }
});

module.exports = router;

function log(...messages) {
    if (DEBUG) {
        messages.forEach(msg => {
            console.log(msg);
        })
    }
}