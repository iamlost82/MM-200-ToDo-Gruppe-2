todoListCtr.ctr_profile = async function(){
    if(!localStorage.getItem('token')){
        todoListCtr.view_loginUser();
    }
    if(localStorage.getItem('username')){
        let username = JSON.parse(localStorage.getItem('username'));
        username = username.charAt(0).toUpperCase() + username.slice(1);
        document.querySelector('#userNameInput').innerHTML = `${username}`
    }
    if(localStorage.getItem('fullname')){
        let fullName = JSON.parse(localStorage.getItem('fullname'));
        fullName = fullName.charAt(0).toUpperCase() + fullName.slice(1);
        document.querySelector('#fullNameInput').value = `${fullName}`
    }
    if(localStorage.getItem('email')){
        let email = JSON.parse(localStorage.getItem('email'));
        document.querySelector('#emailInput').value = `${email}`
    }
    if(localStorage.getItem('lastlogin')){
        let lastlogin = JSON.parse(localStorage.getItem('lastlogin'));
        if(lastlogin !== null){
            let loginDate = new Date(lastlogin);
            let lastLoginP = document.querySelector('#lastLoginP');
            lastLoginP.innerHTML = `Last login: ${loginDate.toLocaleDateString()}`
        }
    }
    let userId = localStorage.getItem('userid');
    let saveUserBtn = document.querySelector('#saveUserBtn');
    let disableUserBtn = document.querySelector('#deleteUserBtn');

    saveUserBtn.addEventListener('click',async function(){
        let validationDiv = document.querySelector('#validationmsg');
        validationDiv.innerHTML = '';
        let fullName = document.querySelector('#fullNameInput').value;
        let email = document.querySelector('#emailInput').value;
        let password = document.querySelector('#passwordInput').value;
        let validationError = 0;
        if(email.length < 1){
            email = JSON.parse(localStorage.getItem('email'));
        }
        if(password.length < 3){
            validationError++;
        }
        if(validationError===0){
            let fetchUrl = '/api/user'
            let inputData =             
            {
                "id": JSON.parse(localStorage.getItem('userid')),
                "fullname":fullName,
                "email":email,
                "password":password
            };
            let fetchSettings = {
                method: 'PUT',
                body: JSON.stringify(inputData),
                headers: {
                    'x-access-auth': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            }
            try {
                let response = await fetch(fetchUrl, fetchSettings);
                log(response.status)
                if (response.status === 200) {
                    let data = await response.json();
                    log(data);
                    //return data;
                } else {
                    throw 'Error';
                }
            } catch (err) {
                log(err);
                //return err;
            }
        } else{
            validationDiv.innerHTML = 'You must provide a new password to save';
        }
    });
};