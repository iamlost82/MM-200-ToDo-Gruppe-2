todoListCtr.view_createUser = function(){
    log('Running create user view');
    let title = 'view_createUser';
    let containerClass = 'login-container';
    let pageContent = todoListCtr.createNodeFromTemplate('#createUserTemp');
    todoListCtr.clearContainer();
    todoListCtr.addNodeToContainer(pageContent);
    todoListCtr.addClassToContainer(containerClass);
    sessionStorage.setItem('lastVisitedPage',title);
    todoListCtr.ctr_createUser();
    todoListCtr.loadingSpinner();
}