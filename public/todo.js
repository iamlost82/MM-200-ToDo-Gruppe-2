(function(){
    //TODO: Fix this when you understand SPA navigation better
    if(sessionStorage.getItem('currentPage')){
        eval(sessionStorage.getItem('currentPage'));
    } else{
        displayLoginPage();        
    }
})();
function addTemplateElementToPage(element){
    document.getElementById('content').appendChild(element);
}
function clearScreen(){
    document.getElementById('content').innerHTML = "";
}
function createElementFromTemplate(templateID){
    let template = document.querySelector(templateID);
    let clone = document.importNode(template.content, true);
    return clone;
}
//Display functions
function displayLoginPage(){
    sessionStorage.setItem('currentPage','displayLoginPage()');
    let pageContent = createElementFromTemplate('#loginPageTemplate');
    clearScreen();
    addTemplateElementToPage(pageContent);    
    let signInBtn = document.querySelector('#loginBtn');
    let registerAccountLink = document.querySelector('#showRegisterAccountLink');
    let forgotPasswordLink = document.querySelector('#showForgotPasswordLink');
    registerAccountLink.addEventListener('click',function(){
        displayRegisterPage();
    });
    forgotPasswordLink.addEventListener('click',function(){
        displayForgotPasswordPage();
    });
    signInBtn.addEventListener('click',function(){
        let halt = false;
        let email = document.querySelector("#email").value;
        let emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        if(!emailTest){ halt = true}
        let password = document.querySelector("#password").value;
        if(password.length < 2){ halt = true}
        if(!halt){
            loginUser(email,password)
        } else{
            let errorMsgDiv = document.querySelector('#errorMsg');
            errorMsgDiv.classList.add('alert');
            errorMsgDiv.innerHTML = '<h3>Sorry! Login failed!!</h3>'
        }
    });
}
function displayRegisterPage(){
    sessionStorage.setItem('currentPage','displayRegisterPage()');
    let pageContent = createElementFromTemplate('#registerPageTemplate');
    clearScreen();
    addTemplateElementToPage(pageContent);    
    let registerBtn = document.querySelector('#registerBtn');
    let loginLink = document.querySelector('#showLoginPageLink');
    registerBtn.addEventListener('click',function(){
        let halt = false;
        let username = document.querySelector('#name').value;
        if(username.length < 2){ halt = true}
        let email = document.querySelector("#email").value;
        let emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        if(!emailTest){ halt = true}
        let password = document.querySelector("#password").value;
        if(password.length < 2){ halt = true}
        if(!halt){
            registerUser(username,email,password);
        } else{
            let errorMsgDiv = document.querySelector('#errorMsg');
            errorMsgDiv.classList.add('alert');
            errorMsgDiv.innerHTML = '<h3>Sorry! User creation failed!!</h3>'
        }
    })
    loginLink.addEventListener('click',function(){
        displayLoginPage();
    });
}
function displayHomePage() {
    sessionStorage.setItem('currentPage','displayHomePage()');
    let pageContent = createElementFromTemplate('#homePageTemplate');
    clearScreen();
    addTemplateElementToPage(pageContent);
    let welcomeStringP = document.querySelector('#welcomeString'); 
    let logOutBtn = document.querySelector('#logOutBtn');
    let welcomeString = welcomeStringP.innerHTML;
    let username = sessionStorage.getItem('name');
    welcomeString = welcomeString.replace('YOURNAME',username);
    welcomeStringP.innerHTML = welcomeString;
    logOutBtn.addEventListener('click', function(){
        sessionStorage.clear();
        displayLoginPage();
    });
}
function displayForgotPasswordPage(){
    sessionStorage.setItem('currentPage','displayForgotPasswordPage()');
    let pageContent = createElementFromTemplate('#forgotPasswordPageTemplate');
    clearScreen();
    addTemplateElementToPage(pageContent);
    let backToLoginBtn = document.querySelector('#backToLogin');
    backToLoginBtn.addEventListener('click', function(){
        displayLoginPage();
    });
}
//Helper functions
async function loginUser(email,password){
    let errorMsgDiv = document.querySelector('#errorMsg');
    errorMsgDiv.className = '';
    errorMsgDiv.innerHTML = '';

    let responseCode = null;
    let response = await fetch('/api/user/auth',
    {
        method: 'POST',
        headers:{
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({email:email,password:password})
    });
    responseCode=response.status;
    response = await response.json();
    if(responseCode === 200){
        sessionStorage.setItem('name',response.userData.name);
        sessionStorage.setItem('email',response.userData.email);
        displayHomePage();
    } else{
        errorMsgDiv.classList.add('alert');
        errorMsgDiv.innerHTML = '<h3>Sorry! Login failed!!</h3>'
    }
}
async function registerUser(username,email,password){
    let errorMsgDiv = document.querySelector('#errorMsg');
    errorMsgDiv.className = '';
    errorMsgDiv.innerHTML = '';

    let response = await fetch('/api/user/',
    {
        method: 'POST',
        headers:{
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({username:username,email:email,password:password})
    });
    let responseCode = response.status;
    response = await response.json();
    if(responseCode === 201){
        displayLoginPage();
    } else{
        errorMsgDiv.classList.add('alert');
        errorMsgDiv.innerHTML = '<h3>Sorry! User creation failed!!</h3>'       
    }
}