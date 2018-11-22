todoListCtr.view_list = function(listID){
    log('Running single list view for list with id:' + listID);
    let title = 'view_list';
    let containerClass = 'content-container';
    let pageContent = todoListCtr.createNodeFromTemplate('#listTemp');
    todoListCtr.clearContainer();
    todoListCtr.addNodeToContainer(pageContent);
    todoListCtr.addClassToContainer(containerClass);
    sessionStorage.setItem('lastVisitedPage',title);
    todoListCtr.ctr_list();
    todoListCtr.loadingSpinner();
}