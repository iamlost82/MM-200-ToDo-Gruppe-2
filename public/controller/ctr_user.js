todoListCtr.ctr_loginUser = function(){
    document.querySelector('#link_createUser').addEventListener('click', function(){
        todoListCtr.loadingSpinner('show');
        log('Create user clicked, swithing view...');
        sessionStorage.setItem('lastVisitedPage','view_createUser');
        todoListCtr.ctr_nav();
    });
    document.querySelector('#loginUserBtn').addEventListener('click', async function(){
        todoListCtr.loadingSpinner('show');
        log('Login User Btn clicked, starting login process...');
        let loginerror = document.querySelector('#login-msg');
        let username = document.querySelector('#username').value;
        let password = document.querySelector('#password').value;
        if(todoListCtr.ctr_validateNotEmpty([username,password])){
            log('No validation error starting fetch...');
            let reqBody = {
                "username":username.toLowerCase(),
                "password":password
            };
            let fetchSettings = {
                method: "POST",
                headers:{
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(reqBody)
            }
            let url = "/authorize";
            try {
                let response = await fetch(url,fetchSettings);
                if(response.status > 399){throw 'Not authorized';}
                let data = await response.json();
                log(data);
                localStorage.setItem('token', data.userData.token);
                localStorage.setItem('userid', JSON.stringify(data.userData.userid));
                localStorage.setItem('username', JSON.stringify(data.userData.username));
                sessionStorage.setItem('lastVisitedPage','view_home');
                todoListCtr.ctr_nav();
            } catch (error) {
                log(error);
                loginerror.className = 'login-error';
                loginerror.innerHTML = 'Sorry, login failed';
                todoListCtr.loadingSpinner();
            }
        } else{
            todoListCtr.loadingSpinner();
        }
    });
}

todoListCtr.ctr_createUser = function(){
    document.querySelector('#link_loginUser').addEventListener('click', function(){
        todoListCtr.loadingSpinner('show');
        log('Login user clicked, swithing view...');
        sessionStorage.setItem('lastVisitedPage','view_loginUser');
        todoListCtr.ctr_nav();
    });
    document.querySelector('#createUserBtn').addEventListener('click', async function(){
        todoListCtr.loadingSpinner('show');
        log('Proccessing of signup form started...');
        let loginerror = document.querySelector('#login-msg');
        loginerror.className = '';
        loginerror.innerHTML = '';
        let username = document.querySelector('#username').value;
        let fullname = document.querySelector('#fullname').value;
        let email = document.querySelector('#email').value;
        let password = document.querySelector('#password').value;
        if(!todoListCtr.ctr_validateEmail(email)){
            loginerror.className = 'login-error';
            loginerror.innerHTML = 'You must enter a valid email adress';
            todoListCtr.loadingSpinner();
        } else if(!todoListCtr.ctr_validateNotEmpty([username,email,password])){
            loginerror.className = 'login-error';
            loginerror.innerHTML = 'Only "Full name" can be left empty';
            todoListCtr.loadingSpinner();
        } else{
            log('No validation error starting fetch...');
            let reqBody = {
                "username":username.toLowerCase(),
                "fullname":fullname,
                "email":email,
                "password":password
            };
            let fetchSettings = {
                method: "POST",
                headers:{
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify(reqBody)
            }
            let url = "/api/user";
            try {
                let response = await fetch(url,fetchSettings);
                if(response.status > 399){throw 'Not allowed';}
                let data = await response.json();
                log(data);
                if(data.rows[0].email){
                    let msgArea = document.querySelector('form');
                    msgArea.innerHTML = 
                    `<h1>User successfully created</h1>`;
                    let link = document.querySelector('#link_loginUser');
                    link.innerHTML = 'Click here to proceed to login page...'
                    todoListCtr.loadingSpinner();
                }
            } catch (error) {
                log(error);
                loginerror.className = 'login-error';
                loginerror.innerHTML = 'Sorry, new user is not created';
                todoListCtr.loadingSpinner();
            }
        }
    });
}