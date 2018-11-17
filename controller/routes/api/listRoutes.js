const DEBUG = true;

const express = require('express');
const router = express.Router();
const db = require('../../../model/db');
const auth = require('../../routes/authenticate');

router.post('/api/list',auth, async function (req, res, next) {
    log('Post request in list API triggered');
    let response = {};
    let validationErrors = 0;
    let title = null;
    let category = null;
    let color = null;
    let ownerid = req.token.id;
    let ownerusername = req.token.username;
    let query = `INSERT INTO "public"."lists"(title, category, color, ownerid, ownerusername) 
                 VALUES($1, $2, $3, $4, $5) 
                 RETURNING id,title,created`;
    if (req.body.title && req.body.category && req.body.color) {
        title = req.body.title;
        if (title.length < 1) { validationErrors++; }
        category = req.body.category;
        if (category.length < 1) { category = null; }
        color = req.body.color;
        if (color.length < 1) { color = null; }
    } else{
        log('Validation error on required fields')
        validationErrors++;
    }
    let queryValues = [title, category, color, ownerid, ownerusername];
    log(queryValues);
    try {
        if(validationErrors>0){throw 'Validation failed';}
        response = await db.update(query, queryValues);
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

router.get('/api/lists',function(req,res,next){
    log('Get request in list API triggered');
    res.status(200).json({msg:'get lists'});
});

router.get('/api/list/:id',function(req,res,next){
    log('Get single request in list API triggered');
    res.status(200).json({msg:'get single list'});
});

router.put('/api/list',function(req,res,next){
    log('Put request in list API triggered');
    res.status(200).json({msg:'put list'});
});

router.delete('/api/list',function(req,res,next){
    log('Delete request in list API triggered');
    res.status(200).json({msg:'delete list'});
});

module.exports = router;

function log(...messages) {
    if (DEBUG) {
        messages.forEach(msg => {
            console.log(msg);
        })
    }
}