const express = require('express');
const router = express.Router();

const users = [{id:"1",name:"Mr.Fluffy",email:"fluffy@uia.no",password:"12345678"}];

router.post('/', (req,res,next) => {
    let status = 400;
    let response = {msg:"Error on creating new user"};
    userValidation = validateNewUserInput(req.body);
    if(userValidation.success===true){
        user = req.body;
        user.id = users.length +1;
        users.push(user);
        status = 201;
        response = user;
    } else{
        status = 400;
        response = {msg:userValidation.msg}
    }
    res.status(status).json(response).end();
});

router.post('/auth', (req,res,next) => {
    let status = 401;
    let response = {msg:"Authentication failed"};
    if(validateUserAuthInput(req.body)===true){
        let authStatus = authorizationCheck(req.body);
        if(authStatus.success===true){
            status = 200;
            response = {
                id:authStatus.id,
                name:authStatus.name,
                email:authStatus.email
            };
        }
    }
    res.status(status).json(response).end();
});

function validateNewUserInput(userData){
    let response = {success:true};
    if(!userData.name || !userData.email || !userData.password){
        response = {success:false,msg:"Storing user failed, check API documentation"};
    } else {
        for(i in users){
            if(userData.email === users[i].email){
                response = {success:false,msg:"Duplicate email found"};
                break;
            }
        }
    }
    return response;
}

function validateUserAuthInput(userData){
    let response = true;
    if(!userData.email || !userData.password){
        respone = false;
    }
    return response;
}
function authorizationCheck(userData){
    let response = {success:false};
    for(i in users){
        if(users[i].email === userData.email && users[i].password === userData.password){
            response = {success:true,id:users[i].id,name:users[i].name,email:users[i].email};
            break;
        }
    }
    return response;
}
module.exports = router;