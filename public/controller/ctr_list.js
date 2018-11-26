todoListCtr.ctr_list = async function(){
    if(!localStorage.getItem('token')){
        todoListCtr.view_loginUser();
    }
    if(!sessionStorage.getItem('activeList')){
        todoListCtr.view_home();
    }
    let elementViewDiv = document.querySelector('#elementView');
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
    elementViewDiv.addEventListener('click',async function(evt){
        if(evt.target.type==='checkbox'){
            if(evt.target.checked === true){
                for(i in elements){
                    if(evt.target.value === elements[i].id){
                        elements[i].checked = 'now';
                        elements[i].checkedbyid = JSON.parse(localStorage.getItem('userid'));
                        elements[i].checkedbyusername = JSON.parse(localStorage.getItem('username'));
                        updatedElement = await updateElement(elements[i]);
                        log(updatedElement);
                        elements[i].checked = updatedElement.rows[0].checked;
                        elements[i].checkedbyid = updatedElement.rows[0].checkedbyid;
                        elements[i].checkedbyusername = updatedElement.rows[0].checkedbyusername;
                        renderElements();
                    }
                }
            } else{
                for(i in elements){
                    if(evt.target.value === elements[i].id){
                        elements[i].checked = null;
                        elements[i].checkedbyid = null;
                        elements[i].checkedbyusername = null;
                        updatedElement = updateElement(elements[i]);
                        renderElements();
                    }
                }
            }
        }
    });
    //newListElementBtn.addEventListener('click',createNewElement);

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

    function orderElements(){
        
    }

    function renderElements(){
        elementViewDiv.innerHTML = '';
        for(i in elements){
            let container = document.createElement('div');
            let checkbox = document.createElement('input');
            let label = document.createElement('label');
            let caption = document.createElement('div');
            let title = document.createElement('input');
            let byline = document.createElement('p');

            container.className = 'elementContainer';
            checkbox.className = 'checkmark';
            caption.className = 'elementCaption';

            checkbox.id = 'elementId_' + elements[i].id;
            checkbox.type = 'checkbox';
            checkbox.value = elements[i].id;
            label.htmlFor = 'elementId_' + elements[i].id;
            title.type = 'text';

            title.value = elements[i].title;
            if(elements[i].deadline !== null){
                let deadline = new Date(elements[i].deadline);
                deadline = deadline.toLocaleDateString();
                byline.innerHTML = 'Due: ' + deadline;
            }
            if(elements[i].checked !== null){
                checkbox.checked = true;
                let checkedDate = new Date(elements[i].checked);
                checkedDate = checkedDate.toLocaleString();
                byline.innerHTML = `OK: ${checkedDate},by ${elements[i].checkedbyusername}`
            }
            
            caption.appendChild(title);
            caption.appendChild(byline);
            container.appendChild(checkbox);
            container.appendChild(label);
            container.appendChild(caption);
            elementViewDiv.appendChild(container);

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

    async function updateElement(elementData) {
        let elementid = parseInt(elementData.id);
        let fetchUrl = `/api/element/${elementid}`;
        if(elementData.deadline !== null){
            let deadlineDate = new Date(elementData.deadline);
            elementData.deadline = deadlineDate;
        }
        let inputData = {
            title:elementData.title,
            check:
                {
                checked:elementData.checked,
                checkedbyid:elementData.checkedbyid,
                checkedbyusername:elementData.checkedbyusername
            },
            deadline:elementData.deadline
        }
        let fetchSettings = {
            method: 'PUT',
            body: JSON.stringify(inputData),
            headers: {
                'x-access-auth': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }
        try {
            let response = await fetch(fetchUrl, fetchSettings);
            log(response.status)
            if (response.status === 200) {
                let data = await response.json();
                log(data);
                return data;
            } else {
                throw 'Error';
            }
        } catch (err) {
            log(err);
            return err;
        }
    }

    async function deleteElement(){

    }

    async function updateList(){

    }

    async function deleteList(){

    }
}