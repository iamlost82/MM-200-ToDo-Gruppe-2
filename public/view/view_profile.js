todoListCtr.view_profile = function(){
    log('Running profile view');
    let title = 'view_profile';
    let containerClass = 'content-container';
    let pageContent = todoListCtr.createNodeFromTemplate('#profileTemp');
    todoListCtr.clearContainer();
    todoListCtr.addNodeToContainer(pageContent);
    todoListCtr.addClassToContainer(containerClass);
    sessionStorage.setItem('lastVisitedPage',title);
    todoListCtr.ctr_profile();
    todoListCtr.loadingSpinner();
}