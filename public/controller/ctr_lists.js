todoListCtr.ctr_home = function(){
    if(!localStorage.getItem('token')){
        todoListCtr.view_loginUser();
    }
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
        listDiv.className = 'listDiv';
        listDiv.innerHTML = data.rows[i].title;
        listDiv.addEventListener('click',function(evt){
            console.log(evt.srcElement.id);
        });
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
        listDiv.innerHTML = data.ownLists.rows[i].title;
        listDiv.addEventListener('click',function(evt){
            console.log(evt.srcElement.id);
        });
        listViewDiv.appendChild(listDiv);
    }
    for(i in data.subscribedLists.rows){
        let listDiv = document.createElement('div');
        listDiv.id = 'listID_' + data.subscribedLists.rows[i].id;
        listDiv.className = 'listDiv';
        listDiv.innerHTML = data.subscribedLists.rows[i].title;
        listDiv.addEventListener('click',function(evt){
            console.log(evt.srcElement.id);
        });
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
}