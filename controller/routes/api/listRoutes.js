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
                            id,title,tags,color,created,ownerid,ownerusername,visibility,active`;
    let queryValues = [title, req.token.id, req.token.username];
    let queryResult = await db.update(query, queryValues);
    if(queryResult.status === 200){queryResult.status = 201;}
    res.status(queryResult.status).json(queryResult.return);
});

router.get('/api/lists',auth, async function(req,res){
    log('Get request in list API triggered');
    //Find own lists
    let queryOwnLists = 'SELECT * FROM "public"."lists" WHERE "ownerid" = $1';
    let queryOwnValues = [req.token.id];
    let queryOwnResult = await db.select(queryOwnLists,queryOwnValues);
    let querySubLists = 'SELECT * FROM "public"."lists" INNER JOIN "public"."subscriptions" ON "public"."lists"."id" = "public"."subscriptions"."list_id" WHERE "public"."subscriptions"."user_id" = $1 AND NOT "public"."lists"."visibility" = 0';
    let querySubValues = [req.token.id];
    let querySubResult = await db.select(querySubLists,querySubValues);
    if(queryOwnResult.status === 200 && querySubResult.status === 200){
        let allValidLists = {};
        allValidLists.ownLists  = queryOwnResult.return;
        allValidLists.subscribedLists = querySubResult.return;
        res.status(200).json(allValidLists);
    } else{
        res.status(500).json({msg:'Error in getting data from database'})
    }
});

router.put('/api/list/:id',auth, async function(req,res,next){
    log('Put request in list API triggered');
    let title, tags, color, visibility, active;
    title = tags = color = visibility = active = null;
    if(req.body.title){
        if(req.body.title.length > 0){
            title = req.body.title;
        }
    }
    if(req.body.tags){
        if(req.body.tags.length > 0){
            tags = req.body.tags;
        }
    }
    if(req.body.color){
        if(req.body.color.length > 0){
            color = req.body.color;
        }
    }
    if(req.body.visibility){
        if(req.body.visibility.length > 0){
            visibility = req.body.visibility;
        }
    }
    if(req.body.active){
        if(req.body.active.length > 0){
            active = req.body.active;
        }
    }
    let query = `UPDATE "public"."lists" 
                        SET 
                            title = $1,
                            tags = $2,
                            color = $3,
                            visibility = $4,
                            active = $5
                        WHERE 
                            id = $6 
                        RETURNING 
                            id,title,tags,color,created,ownerid,ownerusername,visibility,active`;
    let queryValues = [title, tags, color, visibility, active, req.params.id];
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
                            id,title,tags,color,created,ownerid,ownerusername,visibility,active`;
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