(function(){
    displayLoginPage();
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
        displayRegisterPage()
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
    let signUpBtn = document.querySelector('#loginBtn');
    let loginLink = document.querySelector('#showLoginPageLink');
    loginLink.addEventListener('click',function(){
        displayLoginPage();
    });
}
function validateEmail(email){

}
async function loginUser(username,password){
    let response = await fetch('/api/user/auth',
    {
        method: 'POST',
        headers:{
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({username:username,password:password})
    });
    response = await response.json();
    console.log(response);
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