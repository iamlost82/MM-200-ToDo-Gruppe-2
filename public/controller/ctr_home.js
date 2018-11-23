todoListCtr.ctr_home = async function(){
    if(!localStorage.getItem('token')){
        todoListCtr.view_loginUser();
    }
    let lists = [];
    lists = await fetchListData();
    renderLists();
    let listViewDiv = document.querySelector('#listView');
    let listNameInput = document.querySelector('#newListInput');
    let newListBtn = document.querySelector('#newListBtn');
    newListBtn.addEventListener('click', newListBtnHandler);
    listNameInput.addEventListener('keyup', function(evt){
        let key = evt.which || evt.keycode;
        if(key === 13){
            newListBtnHandler();
        }
    });
    listViewDiv.addEventListener('click',function(evt){
        if(evt.target.closest('.listDiv')){
            let clickedDivValue = evt.target.closest('.listDiv').value;
            sessionStorage.setItem('lastVisitedList',clickedDivValue);
            log(clickedDivValue);
            todoListCtr.view_list();
        }
    });
    async function newListBtnHandler (){
        let listName = listNameInput.value;
        if(listName !== ''){
            listNameInput.value = '';
            let newItem = await createNewList(listName);
            newItem.rows[0].sub_id=null;
            newItem.rows[0].user_id=null;
            newItem.rows[0].list_id=null;
            newItem.rows[0].permission=null;
            log(newItem.rows[0]);
            lists.unshift(newItem.rows[0]);
            await renderLists();
        } else{
            document.querySelector('#newListInput').placeholder = 'Dooooh';
        }    
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
                return data.rows;
            } else{
                throw 'Error';
            }
        } catch(err){
            return err;
        }    
    }
    
    function renderLists(){
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
                case 1:
                    newListIcon.src = '/images/shared.png';
                    newListIcon.alt = 'Shared list';
                    break;
                case 2:
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
}