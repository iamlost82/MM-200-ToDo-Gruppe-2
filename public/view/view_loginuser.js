todoListCtr.view_loginUser = function(){
    log('Running login user view');
    let title = 'view_loginUser';
    let containerClass = 'login-container';
    let pageContent = todoListCtr.createNodeFromTemplate('#loginUserTemp');
    todoListCtr.clearContainer();
    todoListCtr.addNodeToContainer(pageContent);
    todoListCtr.addClassToContainer(containerClass);
    sessionStorage.setItem('lastVisitedPage',title);
    todoListCtr.ctr_loginUser(); 
}