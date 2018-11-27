todoListCtr.ctr_profile = async function(){
    if(!localStorage.getItem('token')){
        todoListCtr.view_loginUser();
    }
    if(localStorage.getItem('username')){
        let username = JSON.parse(localStorage.getItem('username'));
        username = username.charAt(0).toUpperCase() + username.slice(1);
        document.querySelector('#userNameInput').value = `${username}`
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

};