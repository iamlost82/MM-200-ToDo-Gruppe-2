todoListCtr.ctr_list = function(){
    if(!localStorage.getItem('token')){
        todoListCtr.view_loginUser();
    }
}