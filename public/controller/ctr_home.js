todoListCtr.ctr_home = async function(){
    if(!localStorage.getItem('token')){
        todoListCtr.view_loginUser();
    }
    let lists = [];
    data = await fetchListData();
    for(i in data.ownLists.rows){
        lists.push(data.ownLists.rows[i])
    }
    for(i in data.subscribedLists.rows){
        lists.push(data.subscribedLists.rows[i])
    }
    renderLists(lists);

    let newListBtn = document.querySelector('#newListBtn');
    newListBtn.addEventListener('click', async function(){
        let listName = document.querySelector('#newListInput').value;
        if(listName !== ''){
            newListInput.value = '';
            let newItem = await createNewList(listName);
            lists.shift(newItem.rows[0]);
            renderLists(lists);
        } else{
            document.querySelector('#newListInput').placeholder = 'Dooooh';
        }
    });
}

async function fetchListData(){
    let data = null;
    let token = localStorage.getItem('token');
    let fetchUrl = '/api/lists';
    let fetchSettings = {
        method: 'GET',
        headers: {
            "x-access-auth": token
        }
    }
    try{
        let response = await fetch(fetchUrl,fetchSettings);
        if(response.status === 200){
            data = await response.json();
            return data;
        } else{
            throw 'Error';
        }
    } catch(err){
        return err;
    }    
}

function renderLists(lists){
    log(lists);
    let listViewDiv = document.querySelector('#listView');
    listViewDiv.innerHTML = '';
    for(i in lists){
        let newListDiv = document.createElement('div');
        newListDiv.className = 'listDiv';
        newListDiv.value = lists[i].id;
        
        let newListTitle = document.createElement('H2');
        newListTitle.innerHTML = lists[i].title;

        let newListIcon = document.createElement('img');
        switch(lists[i].visibility){
            case 0:
                newListIcon.src = '/images/private.png';
                newListIcon.alt = 'Private list';
                break;
            case 0:
                newListIcon.src = '/images/shared.png';
                newListIcon.alt = 'Shared list';
                break;
            case 0:
                newListIcon.src = '/images/public.png';
                newListIcon.alt = 'Public list';
                break;
            default:
                newListIcon.src = '/images/private.png';
                newListIcon.alt = 'Private list';
        }

        newListDiv.appendChild(newListIcon);
        newListDiv.appendChild(newListTitle);
        listViewDiv.appendChild(newListDiv);
    }
}

async function createNewList(listName){
    let fetchUrl = '/api/list';
    let inputData = {
        title: listName
    }
    let fetchSettings = {
        method: 'POST',
        body: JSON.stringify(inputData),
        headers:{
            'x-access-auth':localStorage.getItem('token'),
            'Content-Type':'application/json'
        }
    }
    try{
        let response = await fetch(fetchUrl,fetchSettings);
        if(response.status === 201){
            let data = await response.json();
            return data
        } else{
            throw 'Error';
        }
    } catch(err){
        return err;
    }      
}
/*
    renderLists();
    let newListInput = document.querySelector('#newListInput');
    newListInput.addEventListener('keyup', function(e){
        let key = e.which || e.keycode;
        if(key === 13){
            let listName = document.querySelector('#newListInput').value;
            if(listName !== ''){
                newListInput.value = "";
                createNewList(listName);
            } else{
                document.querySelector('#newListInput').placeholder = 'Dooooh';
            }
        };
    })
    let newListBtn = document.querySelector('#newListBtn');
    newListBtn.addEventListener('click', function(){
        let listName = document.querySelector('#newListInput').value;
        if(listName !== ''){
            newListInput.value = "";
            createNewList(listName);
        } else{
            document.querySelector('#newListInput').placeholder = 'Dooooh';
        }
    });
}

async function createNewList(listname){
    let fetchUrl = '/api/list';
    let inputData = {
        title: listname
    }
    let fetchSettings = {
        method: 'POST',
        body: JSON.stringify(inputData),
        headers:{
            'x-access-auth':localStorage.getItem('token'),
            'Content-Type':'application/json'
        }
    }
    try{
        let response = await fetch(fetchUrl,fetchSettings);
        if(response.status === 201){
            data = await response.json();
            await renderNewElement(data);
        } else{
            throw 'Error';
        }
    } catch(err){
        console.log(err);
    }    



}

async function renderNewElement(data){
    let listViewDiv = document.querySelector('#listView');
    for(i in data.rows){
        let listDiv = document.createElement('div');
        listDiv.id = 'listID_' + data.rows[i].id;
        listDiv.value = data.rows[i].id;
        listDiv.className = 'listDiv';
        listDiv.innerHTML = data.rows[i].title;
        listViewDiv.insertBefore(listDiv, listViewDiv.firstChild);
    }
}

async function renderLists(){
    let data = await fetchData();
    let listViewDiv = document.querySelector('#listView');
    listViewDiv.innerHTML = "";
    for(i in data.ownLists.rows){
        let listDiv = document.createElement('div');
        listDiv.id = 'listID_' + data.ownLists.rows[i].id;
        listDiv.className = 'listDiv';
        listDiv.value = data.ownLists.rows[i].id;
        listDiv.innerHTML = data.ownLists.rows[i].title;
        listViewDiv.appendChild(listDiv);
    }
    for(i in data.subscribedLists.rows){
        let listDiv = document.createElement('div');
        listDiv.id = 'listID_' + data.subscribedLists.rows[i].id;
        listDiv.className = 'listDiv';
        listDiv.value = data.subscribedLists.rows[i].id;
        listDiv.innerHTML = data.subscribedLists.rows[i].title;
        listViewDiv.appendChild(listDiv);
    }
}

async function fetchData(){
    let data = null;
    let token = localStorage.getItem('token');
    let fetchUrl = '/api/lists';
    let fetchSettings = {
        method: 'GET',
        headers: {
            "x-access-auth": token
        }
    }
    try{
        let response = await fetch(fetchUrl,fetchSettings);
        if(response.status === 200){
            data = await response.json();
            return data;
        } else{
            throw 'Error';
        }
    } catch(err){
        return err;
    }
}*/