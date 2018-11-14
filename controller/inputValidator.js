const DEBUG = false;

validator = function (req,res,next){
    let validationErrors = 0;
    if(req.expInput){
        log('Running validation on input data')
        for(i in req.expInput){
            if(!(req.expInput[i] in req.body)){
                log('Validation error found');
                validationErrors++;
                break;
            }
        }
        if(req.body.email){
            let regTest = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            if(!regTest.test(req.body.email)){
                validationErrors++;
                log('Validation error found on email format');
            };
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