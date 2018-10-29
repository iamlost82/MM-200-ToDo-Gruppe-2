(function(){
    if(sessionStorage.getItem('email')){
        displayHomePage();
    } else{
        displayLoginPage();
    }
})();
//Render pages
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
//Login page
function displayLoginPage(){
    let pageContent = createElementFromTemplate('#loginPageTemplate');
    clearScreen();
    addTemplateElementToPage(pageContent);    
    let signInBtn = document.querySelector('#loginBtn');
    let registerAccountLink = document.querySelector('#showRegisterAccountLink');
    let forgotPasswordLink = document.querySelector('#showForgotPasswordLink');
    registerAccountLink.addEventListener('click',function(){
        displayRegisterPage();
    });
    signInBtn.addEventListener('click',function(){
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;
        if(email.length > 1 && password.length > 1){
            loginUser(email,password)
        } else{
            alert('Login failed');
        }
    });
}
//Register page
function displayRegisterPage(){
    let pageContent = createElementFromTemplate('#registerPageTemplate');
    clearScreen();
    addTemplateElementToPage(pageContent);    
    let registerBtn = document.querySelector('#registerBtn');
    let loginLink = document.querySelector('#showLoginPageLink');
    registerBtn.addEventListener('click',function(){
        let username = document.querySelector('#name').value;
        let email = document.querySelector('#email').value;
        let password = document.querySelector('#password').value;
        if(username.length > 1 && email.length > 1 && password.length > 1){
            registerUser(username,email,password);
        } else{
            alert("Big nono");
        }
    })
    loginLink.addEventListener('click',function(){
        displayLoginPage();
    });
}
//Home page
function displayHomePage() {
    let pageContent = createElementFromTemplate('#homePageTemplate');
    clearScreen();
    addTemplateElementToPage(pageContent);
    let welcomeStringP = document.querySelector('#welcomeString'); 
    let welcomeString = welcomeStringP.innerHTML;
    let username = sessionStorage.getItem('name');
    welcomeString = welcomeString.replace('YOURNAME',username);
    welcomeStringP.innerHTML = welcomeString;
}
//Other functions
async function loginUser(email,password){
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
        alert('Login failed');
    }
}
async function registerUser(username,email,password){
    let response = await fetch('/api/user/',
    {
        method: 'POST',
        headers:{
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({username:username,email:email,password:password})
    });
    response = await response.json();
    console.log(response);
}