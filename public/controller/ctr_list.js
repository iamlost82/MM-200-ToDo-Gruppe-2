todoListCtr.ctr_list = async function(){
    if(!localStorage.getItem('token')){
        todoListCtr.view_loginUser();
    }
    if(!sessionStorage.getItem('activeList')){
        todoListCtr.view_home();
    }
    let listData = JSON.parse(sessionStorage.getItem('activeList'));
    log(listData);
    let listId = listData.id;
    let listTitleH2 = document.querySelector('#listTitle');
    listTitleH2.innerHTML = listData.title;
    let token = localStorage.getItem('token');
    let newListElementBtn = document.querySelector('#newListElementBtn');
    log('You are now in list with ID: '+listData.id);
    let elements = [];
    elements = await fetchElementData();
    renderElements();
    newListElementBtn.addEventListener('click',createNewElement);

    let date = new Date(listData.created);
    log(date);

    async function fetchElementData(){
        let data = null;
        let fetchUrl = `/api/elements/${listId}`;
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

    function renderElements(){
        let elementViewDiv = document.querySelector('#elementView');
        elementViewDiv.innerHTML = '';
        for(i in elements){
            let div = document.createElement('div');
            let input = document.createElement('input');
            let label = document.createElement('label');

            input.type = 'checkbox';
            input.id = 'element_' + elements[i].id;

            label.htmlFor = input.id;
            label.innerHTML = elements[i].title + ' ' + elements[i].deadline;

            div.appendChild(input);
            div.appendChild(label);

            elementViewDiv.appendChild(div);
        }
    }

    async function createNewElement(){
        let newListElementInput = document.querySelector('#newListElementInput');
        let deadlineInput = document.querySelector('#deadlineInput')
        let elementName = newListElementInput.value;
        let deadline = deadlineInput.value;
        let validationError = 0;
        log(elementName);
        log(deadline);
        if(elementName.length < 1){ validationError++; }
        if(deadline.length === 0){ deadline = null; }
        if(listId.length === 0){ validationError++; }
        if(validationError === 0){
            let fetchUrl = '/api/element';
            let inputData = {
                title: elementName,
                listid: listId,
                deadline: deadline
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
                log(response.status)
                if(response.status === 201){
                    let data = await response.json();
                    log(data);
                    elements.unshift(data.rows[0]);
                    newListElementInput.value = '';
                    deadlineInput.value = '';
                    renderElements();
                } else{
                    throw 'Error';
                }
            } catch(err){
                log(err);
            }
        } else{
            log('Saving failed');
        }      
    }
}