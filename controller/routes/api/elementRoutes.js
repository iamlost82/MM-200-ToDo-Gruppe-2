const DEBUG = false;

const express = require('express');
const router = express.Router();
const db = require('../../../model/db');
const auth = require('../../routes/authenticate');

router.post('/api/element',auth, async function (req, res) {
    log('Starting post request to element');
    let title = req.body.title;
    let deadline = req.body.deadline;
    let listid = req.body.listid;
    let userid = req.token.id;
    let username = req.token.username;
    let query = `INSERT INTO "public"."elements"(title,authorid,authorusername,listid,deadline)
                 VALUES($1,$2,$3,$4,$5)
                 RETURNING *`;
    let queryValues = [title,userid,username,listid,deadline];
    let queryResult = await db.insert(query,queryValues);
    if(queryResult.status === 200){queryResult.status = 201;}
    res.status(queryResult.status).json(queryResult.return);
});

router.get('/api/elements/:listid',auth, async function (req, res) {
    log('Starting get request to elements in list');
    let listid = req.params.listid;
    let query = `SELECT * 
                 FROM "public"."elements" 
                 WHERE "listid" = $1 AND "active" = 1 
                 ORDER BY "checked" DESC, "deadline" ASC`;
    let queryValues = [listid];
    let queryResult = await db.select(query,queryValues);
    res.status(queryResult.status).json(queryResult.return);
});

router.put('/api/element/:id',auth, async function (req, res) {
    log('Starting put request to element');
    let elementid = req.params.id;
    let title = req.body.title;
    let checked = null;
    let checkedbyid = null;
    let checkedbyusername = null;
    let deadline = req.body.deadline;
    if(req.body.check !== null){
        checked = req.body.check.checked;
        checkedbyid = req.body.check.checkedbyid;
        checkedbyusername = req.body.check.checkedbyusername;
    }
    let query = `UPDATE "public"."elements" 
                 SET 
                    "title" = $1, 
                    "checked" = $2, 
                    "checkedbyid" = $3, 
                    "checkedbyusername" = $4, 
                    "deadline" = $5 
                 WHERE
                    "id" = $6 
                 RETURNING
                    *`;
    let queryValues =[title,checked,checkedbyid,checkedbyusername,deadline,elementid];
    log(queryValues);
    let queryResult = await db.update(query,queryValues);
    res.status(queryResult.status).json(queryResult.return);
});

router.delete('/api/element/:id',auth, async function (req, res) {
    log('Starting delete request to element');
    let elementid = req.params.id;
    let query = `UPDATE "public"."elements" SET "active" = 2 WHERE "id" = $1 RETURNING *`;
    let queryValues = [elementid];
    let queryResult = await db.update(query,queryValues);
    res.status(queryResult.status).json(queryResult.return)
});

router.delete('/api/elements/:listid',auth, async function(req,res){
    log('Starting delete on completed tasks');
    let listID = req.params.listid;
    let query = `DELETE from "public"."elements" WHERE "checked" IS NOT NULL AND listid = $1 RETURNING *`;
    let queryValues = [listID];
    let queryResult = await db.delete(query,queryValues);
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