const DEBUG = true;

const express = require('express');
const router = express.Router();
const db = require('../../../model/db');
const auth = require('../../routes/authenticate');

router.post('/api/list',auth, async function (req, res) {
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

router.get('/api/lists',auth, async function(req,res){
    log('Get request in list API triggered');
    //Find own lists
    let queryOwnLists = 'SELECT * FROM "public"."lists" WHERE "ownerid" = $1';
    let queryOwnValues = [req.token.id];
    let queryOwnResult = await db.select(queryOwnLists,queryOwnValues);
    let querySubLists = 'SELECT * FROM "public"."lists" INNER JOIN "public"."subscriptions" ON "public"."lists"."id" = "public"."subscriptions"."list_id" WHERE "public"."subscriptions"."user_id" = $1';
    let querySubValues = [req.token.id];
    let querySubResult = await db.select(querySubLists,querySubValues);
    if(queryOwnResult.status === 200 && querySubResult.status === 200){
        let allValidLists = {};
        allValidLists.ownLists  = queryOwnResult.return;
        allValidLists.subsribedLists = querySubResult.return;
        res.status(200).json(allValidLists);
    } else{
        res.status(500).json({msg:'Error in getting data from database'})
    }
});

router.get('/api/list/:id',auth, async function(req,res,next){
    log('Get single request in list API triggered');
    let querySingleList = 'SELECT * FROM "public"."lists" WHERE "id" = $1';
    let querySingleValue = [req.params.id];
    let querySingleResult = await db.select(querySingleList,querySingleValue);
    let queryAllowedUsers = 'SELECT * FROM "public"."subscriptions" WHERE "list_id" = $1';
    let queryAllowedValues = [req.params.id];
    let queryAllowedResult = await db.select(queryAllowedUsers,queryAllowedValues);
    let allowed = 0;
    if(querySingleResult.return.rows[0].ownerid === req.token.id){
        log('User is owner..allow access');
        allowed = 1;
    }
    if(req.token.userrole === 99){
        log('User is admin. allow access')
        allowed=1;
    }
    for(i in queryAllowedResult.return.rows){
        log('Running for loop to check if user has access rights');
        if(queryAllowedResult.return.rows[i].user_id === req.token.id){
            log('Hit...User is subscribing. allow access')
            allowed = 1;
        }
    }
    if(allowed === 1){
        res.status(200).json(querySingleResult.return);
    } else{
        res.status(401).json({msg:"Access not allowed"});
    }
});

router.put('/api/list/:id',auth, async function(req,res,next){
    log('Put request in list API triggered');
    let title = req.body.title;
    let category = req.body.category;
    let color = req.body.color;
    
    res.status(200).json({msg:'put list'});
});

router.delete('/api/list/:id', auth, async function(req,res,next){
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