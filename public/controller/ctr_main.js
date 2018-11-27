const DEBUG = false;
let todoListCtr = {};

document.addEventListener("DOMContentLoaded", function() { 
    todoListCtr.ctr_nav();
});

todoListCtr.addNodeToContainer = function(node){
    log('Adding node to container...');
    document.querySelector('#container').appendChild(node);
}

todoListCtr.clearContainer = function(){
    log('removering content from container...');
    let container = document.querySelector('#container');
    log('Removing class from container');
    container.className = '';
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
}

todoListCtr.createNodeFromTemplate = function(templateID){
    log('creating template from templateID ' +templateID);
    let template = document.querySelector(templateID);
    let clone = document.importNode(template.content, true);
    return clone;
}

todoListCtr.addClassToContainer = function (newClass){
    log(`Adding class: "${newClass}" to container...`);
    let container = document.querySelector('#container');
    container.className = newClass;
}

todoListCtr.loadingSpinner = function(options = 'hide'){
    let spinContainer = document.querySelector('#spinContainer');
    if(options === 'show'){
        spinContainer.className = '';
    } else{
        spinContainer.className = 'hide';
    }
}

function log(...messages) {
    if (DEBUG) {
        messages.forEach(msg => {
            console.log(msg);
        })
    }
}