const jwt = require('jsonwebtoken');
const TOKEN_KEY = process.env.TOKEN_KEY

auth = function(req,res,next){
    let token = req.headers['x-access-auth'] || req.body.auth || req.params.auth;
    try{
        let decodedToken = jwt.verify(token, TOKEN_KEY);
        req.token = decodedToken;
        next();
    } catch(err){
        res.status(401).end();
    }
};

module.exports = auth;