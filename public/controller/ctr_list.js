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
    let token = localStorage.getItem('token');
    let newListElementBtn = document.querySelector('#createItemBtn');
    let newListElementInput = document.querySelector('#newListElementInput');
    let toggleNewTaskBtn = document.querySelector('#toggleNewTaskBtn');
    let toggleListSettingsBtn = document.querySelector('#toggleListSettingsBtn');
    let createNewElementDiv = document.querySelector('#createNewElementDiv');
    let editListDiv = document.querySelector('#editListDiv');
    let addListTagInp = document.querySelector('#addListTagInp');
    let tagContainer = document.querySelector('.tagContainer');
    let deleteCompTasksBtn = document.querySelector('#deleteCompTasksBtn');
    let deactivateListBtn = document.querySelector('#deactivateListBtn');
    let saveChangesBtn = document.querySelector('#saveChangesBtn');
    let shareSetting = document.querySelector('#editListDiv select');
    let editListTitleInp = document.querySelector('#editListTitleInp');
    let showAllBtn = document.querySelector('#showAllBtn');
    let hideCompleteBtn = document.querySelector('#hideCompleteBtn');
    log('You are now in list with ID: '+listData.id);
    let elements = [];
    elements = await fetchElementData();
    if(elements==='Error'){
        localStorage.clear();
        sessionStorage.clear();
        todoListCtr.view_loginUser();
    };
    renderElements();
    renderTags();
    initListView();
    if(JSON.parse(localStorage.getItem('userid')) !== listData.ownerid){
        editListDiv.innerHTML = 'List options not available<br>You are not the list owner.';
        log(JSON.parse(localStorage.getItem('userid')));
        log(listData.ownerid);
    }
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
    newListElementBtn.addEventListener('click',createNewElement);
    newListElementInput.addEventListener('keyup',function(evt){
        let key = evt.which || evt.keycode;
        if(key === 13){
            createNewElement();
        }
    });
    toggleNewTaskBtn.addEventListener('click',function(){
        log(createNewElementDiv.style.display);
        if(createNewElementDiv.style.display === 'block'){
            createNewElementDiv.style.display = 'none';
            editListDiv.style.display = 'none';
        } else{
            createNewElementDiv.style.display = 'block';
            editListDiv.style.display = 'none';
        }
    });
    toggleListSettingsBtn.addEventListener('click',function(){
        log(editListDiv.style.display);
        if(editListDiv.style.display === 'block'){
            editListDiv.style.display = 'none';
            createNewElementDiv.style.display = 'none';
        } else{
            editListDiv.style.display = 'block';
            createNewElementDiv.style.display = 'none';
        }
    });
    addListTagInp.addEventListener('keyup',function(evt){
        let key = evt.which || evt.keycode;
        let newTag = addListTagInp.value;
        if(key === 13){
            if(newTag.length > 0){
                if(listData.tags === null){
                    listData.tags = [];
                }
                listData.tags.push(newTag);
                renderTags();
                addListTagInp.value = '';
            }
        }
    });
    tagContainer.addEventListener('click',function(evt){
        if(evt.target.className === 'tagDismiss'){
            let tagID = parseInt(evt.target.parentElement.id.slice(8));
            listData.tags.splice(tagID,1);
            renderTags();
        }
    });
    deleteCompTasksBtn.addEventListener('click',async function(){
        let data = null;
        let fetchUrl = `/api/elements/${listId}`;
        let fetchSettings = {
            method: 'DELETE',
            headers: {
                "x-access-auth": token
            }
        }
        try{
            let response = await fetch(fetchUrl,fetchSettings);
            if(response.status === 200){
                data = await response.json();
                for(i in data.rows){
                    for(j in elements){
                        if(data.rows[i].id === elements[j].id){
                            elements.splice(j,1);
                        }
                    }
                }
                renderElements();
            } else{
                throw 'Error';
            }
        } catch(err){
            log(err);
        }    
    });
    deactivateListBtn.addEventListener('click',async function(){
        listData.active = 2;
        await updateList();
        log('updateList should be complete')
        sessionStorage.setItem('lastVisitedPage','view_home');
        todoListCtr.ctr_nav();
    });
    saveChangesBtn.addEventListener('click',async function(){
        let data = await updateList();
        listData = data.rows[0];
        sessionStorage.setItem('activeList',JSON.stringify(listData))
        initListView();
        log(data);
        log(listData);
    });
    editListTitleInp.addEventListener('keyup',function(){
        if(editListTitleInp.value.length > 1){
            listData.title = editListTitleInp.value;
            log(listData);
        }
    });
    shareSetting.addEventListener('change',function(){
        listData.visibility = shareSetting.selectedIndex;
        log(listData);
        initListView();
    });
    showAllBtn.addEventListener('click',function(){
        let elementsToCheck = document.querySelectorAll('.elementContainer');
        log(elementsToCheck);
        for(let i = 0; i < elementsToCheck.length; i++){
            if(elementsToCheck[i].children[0].checked === true){
                elementsToCheck[i].style.display = 'block';
            }
        }
    });
    hideCompleteBtn.addEventListener('click',function(evt){
        let elementsToCheck = document.querySelectorAll('.elementContainer');
        log(elementsToCheck);
        for(let i = 0; i < elementsToCheck.length; i++){
            if(elementsToCheck[i].children[0].checked === true){
                elementsToCheck[i].style.display = 'none';
            }
        }
    });


    function initListView(){
        log(listData);
        let shareInfoP = document.querySelector('#shareInfoP');
        listTitleH2.innerHTML = listData.title;
        listData.tags = JSON.parse(listData.tags);
        shareSetting.selectedIndex = listData.visibility;
        if(shareSetting.selectedIndex === 1){
            shareInfoP.innerHTML = `Userid: ${listData.id}, Listid: ${listData.ownerid}`
        } else{
            shareInfoP.innerHTML = ``
        }
        renderTags();
    }

    function renderTags(){
        tagContainer.innerHTML = '';
        for(i in listData.tags){
            let tagChip = document.createElement('div');
            let tagTitle = document.createElement('span');
            let tagDismiss = document.createElement('span');

            tagChip.className = 'tagChip';
            tagTitle.className = 'tagTitle';
            tagDismiss.className = 'tagDismiss';

            tagChip.id = 'tagchip_' + i;

            tagTitle.innerHTML = listData.tags[i];
            tagDismiss.innerHTML = 'X';

            tagChip.appendChild(tagTitle);
            tagChip.appendChild(tagDismiss);
            tagContainer.appendChild(tagChip);
        }
    }

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
            let createdDate = new Date(elements[i].created);
                createdDate = createdDate.toLocaleString();
                byline.innerHTML = `No due date!`
            if(elements[i].deadline !== null){
                let today = new Date();
                let deadline = new Date(elements[i].deadline);
                let todayArr = [today.getFullYear(),today.getMonth(),today.getDate()];
                let deadlineArr = [deadline.getFullYear(),deadline.getMonth(),deadline.getDate()];
                log(todayArr,deadlineArr);
                if(todayArr[2]>deadlineArr[2]){
                    log(todayArr[2]>deadlineArr[2])
                    if(todayArr[1]>=deadlineArr[1]){
                        log(todayArr[1]>=deadlineArr[1])
                        if(todayArr[0]>=deadlineArr[0]){
                            log(todayArr[0]>=deadlineArr[0])
                            container.classList.add('duePast')
                        }
                    }
                }
                if(todayArr[2]===deadlineArr[2]){
                    log(todayArr[2]===deadlineArr[2])
                    if(todayArr[1]===deadlineArr[1]){
                        log(todayArr[1]===deadlineArr[1])
                        if(todayArr[0]===deadlineArr[0]){
                            log(todayArr[0]===deadlineArr[0])
                            container.classList.add('dueToday')
                        }
                    }
                }
                deadline = deadline.toLocaleDateString();
                byline.innerHTML = 'Due: ' + deadline;
            }
            if(elements[i].checked !== null){
                checkbox.checked = true;
                let checkedDate = new Date(elements[i].checked);
                checkedDate = checkedDate.toLocaleString();
                byline.innerHTML = `OK: ${checkedDate}, by ${elements[i].checkedbyusername}`
            }
            
            title.addEventListener('keyup',async function(evt){
                let eventID = evt.target.parentElement.parentElement.children[0].value;
                let eventTitle = evt.target.value
                if(eventTitle.length > 0){
                    for(i in elements){
                        if(eventID === elements[i].id){
                            if(eventTitle !== elements[i].title){
                                elements[i].title = eventTitle;
                                let updatedElement = await updateElement(elements[i]);
                                log(updatedElement)
                            }
                        }
                    }
                }
            });

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
    async function updateList(){
        log('Update list ran');
        let listid = parseInt(listData.id);
        log(listData);
        let fetchUrl = `/api/list/${listid}`;
        let inputData = {
            title:listData.title,
            tags:JSON.stringify(listData.tags),
            visibility:JSON.stringify(listData.visibility),
            active:JSON.stringify(listData.active)
        }
        log(inputData);
        log(fetchUrl);
        let fetchSettings = {
            method: 'PUT',
            body: JSON.stringify(inputData),
            headers: {
                'x-access-auth': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }
        log(fetchSettings);
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

    async function deleteList(){

    }
}