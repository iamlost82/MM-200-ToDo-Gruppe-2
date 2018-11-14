const DEBUG = false;

admOrSelf = function (req,res,next){
    let errors = 1;
    req.body.id = parseInt(req.body.id);
    req.token.id = parseInt(req.token.id);
    req.token.userrole = parseInt(req.token.userrole);
    log(req.body.id,req.token.id);
    log(req.token.userrole);
    if(req.body.id === req.token.id || req.token.userrole ===99){
        log('No error found, resetting errors to 0');
        errors = 0;
    }
    if(errors !== 0){
        res.status(403).json({error:'Not allowed'});
    } else{
        log('No errors found, running next')
        next();
    }
}
module.exports = admOrSelf;

function log(...messages) {
    if (DEBUG) {
        messages.forEach(msg => {
            console.log(msg);
        })
    }
}