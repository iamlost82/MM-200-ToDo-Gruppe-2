todoListCtr.ctr_home = function(){
    if(!localStorage.getItem('token')){
        todoListCtr.view_loginUser();
    }
    
}