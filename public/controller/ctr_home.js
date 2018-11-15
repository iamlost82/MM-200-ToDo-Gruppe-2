todoListCtr.ctr_home = function(){
    if(!localStorage.getItem('token')){
        todoListCtr.view_loginUser();
    }
    document.querySelector('#logOutBtn').addEventListener('click', function(){
        localStorage.clear();
        todoListCtr.view_loginUser();
    });
}