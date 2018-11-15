todoListCtr.ctr_nav = function() {
    if(sessionStorage.getItem('lastVisitedPage')){
        switch(sessionStorage.getItem('lastVisitedPage')){
            case 'view_loginUser':
                todoListCtr.view_loginUser();
                break;
            case 'view_createUser':
                todoListCtr.view_createUser();
                break;
            case 'view_home':
                todoListCtr.view_home();
                break;
            default:
                todoListCtr.view_home();
                break;
        }
    } else if(localStorage.getItem('token')){
        todoListCtr.view_home();
    } else{
        todoListCtr.view_loginUser();
    }
}