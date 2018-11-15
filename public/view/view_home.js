todoListCtr.view_home = function(){
    log('Running home view');
    let title = 'view_home';
    let containerClass = 'content-container';
    let pageContent = todoListCtr.createNodeFromTemplate('#homeTemp');
    todoListCtr.clearContainer();
    todoListCtr.addNodeToContainer(pageContent);
    todoListCtr.addClassToContainer(containerClass);
    sessionStorage.setItem('lastVisitedPage',title);
    todoListCtr.ctr_home(); 
}