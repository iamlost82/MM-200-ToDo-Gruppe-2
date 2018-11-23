todoListCtr.ctr_list = function(){
    if(!localStorage.getItem('token')){
        todoListCtr.view_loginUser();
    }
    if(!sessionStorage.getItem('lastVisitedList')){
        todoListCtr.view_home();
    }
    let listId = sessionStorage.getItem('lastVisitedList');
    log(listId);
}