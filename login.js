//create a simple login system utilizing an array of user objects. 

let objPeople = [
    {
        username: "sam",
        password: "codify"
    },
    {
        username: "matt",
        password: "academy"
    },
    {
        username: "chris",
        password: "forever"
    }
];

function getInfo(){
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    //console.log("you're username is " + username + " and your password is " + password);
    
    for(i = 0; i<objPeople.length; i ++){
        if(username == objPeople[i].username && password == objPeople[i].password){
            console.log(username + " is logged in!")
            return //stopper automatisk (hvis dette ikke er sant så vil du aldri se det.)

        }
        
    }       
}