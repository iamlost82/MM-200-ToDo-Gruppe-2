const DEBUG = false;

validator = function (req,res,next){
    let validationErrors = 0;
    if(req.expInput){
        log('Running validation on input data')
        for(i in req.expInput){
            if(!(req.expInput[i] in req.body) || req.body[req.expInput[i]].length === 0){
                log(req.expInput[i] + 'validation failed');
                validationErrors++;
                break;
            }
        }
    }
    if(req.body.email){
        log('Running email validation');
        let regEx = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if(!regEx.test(req.body.email)){
            log('Email validation failed');
            validationErrors++;        
        }
    }

    if(validationErrors !== 0){
        res.status(400).json({error:'Error in input data, read API documentation'});
    } else{
        log('No validation errors found, running next')
        next();
    }
}
module.exports = validator;

function log(...messages) {
    if (DEBUG) {
        messages.forEach(msg => {
            console.log(msg);
        })
    }
}