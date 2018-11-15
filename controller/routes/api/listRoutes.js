const DEBUG = true;

const express = require('express');
const router = express.Router();
//const db = require('../../../model/db');
//const auth = require('../../routes/authenticate');
//const inputvalidator = require('../../listInputValidator');

router.post('/api/list',function(req,res,next){
    log('Post request in list API triggered');
    res.status(200).json(req.body);
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