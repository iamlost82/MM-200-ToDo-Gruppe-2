const DEBUG = false;

const express = require('express');
const router = express.Router();
const db = require('../../../model/db');
const auth = require('../../routes/authenticate');

router.post('/api/list',auth, async function (req, res) {
    log('Post request in list API triggered');
    let title;
    title = null;
    if(req.body.title){
        if(req.body.title.length > 0){
            title = req.body.title;
        }
    }
    let query = `INSERT into "public"."lists"(title,ownerid,ownerusername) 
                 VALUES($1,$2,$3)
                        RETURNING 
                            *`;
    let queryValues = [title, req.token.id, req.token.username];
    let queryResult = await db.update(query, queryValues);
    if(queryResult.status === 200){queryResult.status = 201;}
    res.status(queryResult.status).json(queryResult.return);
});

router.get('/api/lists',auth, async function(req,res){
    log('Get request in list API triggered');
    let queryLists = `SELECT * from "public"."lists"
    LEFT JOIN "public"."subscriptions"  
        ON "public"."lists"."id" = "public"."subscriptions"."list_id" 
        WHERE "public"."subscriptions"."user_id" = $1
                AND "public"."subscriptions".permission > 0
                AND "public"."lists"."active" = 1 
                AND "public"."lists"."visibility" > 0
           OR "public"."lists"."ownerid" = $2
                AND "public"."lists"."active" = 1  
        ORDER BY "public"."lists"."created" DESC`;
    let queryValues = [req.token.id,req.token.id];
    try{
        let queryResult = await db.select(queryLists,queryValues);
        res.status(queryResult.status).json(queryResult.return);
    } catch(err){
        log(err);
        res.status(500).json({msg:'Error retrieveing data from DB'})
    }
});

router.put('/api/list/:id',auth, async function(req,res,next){
    log('Put request in list API triggered');
    log(req.body);
    let title, tags, visibility, active;
    title = tags = visibility = active = null;
    if(req.body.title){
        if(req.body.title.length > 0){
            title = req.body.title;
        }
    }
    if(req.body.tags){
        log(req.body.tags);
        if(req.body.tags.length > 0){
            tags = req.body.tags;
        }
    }
    if(req.body.visibility){
        log(req.body.visibility)
        if(req.body.visibility.length > 0){
            visibility = req.body.visibility;
        }
    }
    if(req.body.active){
        log(req.body.active);
        if(req.body.active.length > 0){
            active = req.body.active;
        }
    }
    let query = `UPDATE "public"."lists" 
                        SET 
                            "title" = $1,
                            "tags" = $2,
                            "visibility" = $3,
                            "active" = $4
                        WHERE 
                            "id" = $5 
                        RETURNING 
                            *`;
    let queryValues = [title, tags, visibility, active, req.params.id];
    log(queryValues);
    let queryResult = await db.update(query, queryValues);
    res.status(queryResult.status).json(queryResult.return);
});

router.delete('/api/list/:id', auth, async function(req,res,next){
    log('Delete request in list API triggered');
    let query = `UPDATE "public"."lists" 
                        SET 
                            "active" = 2 
                        WHERE 
                            "id" = $1 
                        RETURNING 
                            *`;
    let queryValues = [req.params.id];
    let queryResult = await db.update(query, queryValues);
    res.status(queryResult.status).json(queryResult.return);
});

module.exports = router;

function log(...messages) {
    if (DEBUG) {
        messages.forEach(msg => {
            console.log(msg);
        })
    }
}