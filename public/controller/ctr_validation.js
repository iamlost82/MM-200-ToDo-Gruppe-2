todoListCtr.ctr_validateNotEmpty = function(inputArray){
    log('Running validation: Input field not empty');
    let response = true;
    for(i in inputArray){
        if(inputArray[i].length === 0){
            log(`Validation returned ${response}`);
            response = false;
        }
    }
    return response;
}

todoListCtr.ctr_validateEmail = function(email){
    log('Running validation: Email is email');
    let response = false;
    let myRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    response = myRegex.test(email);
    log(`Validation returned ${response}`);
    return response;
}