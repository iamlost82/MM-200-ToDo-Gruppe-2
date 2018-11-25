var ul = document.getElementById("list");
var input = document.getElementById("input");
var dateInput = document.getElementById("date");
var teller = 0;
let active_list = JSON.parse(sessionStorage.getItem("activeList"));

document.getElementById("title_name").innerHTML = active_list.title;

refreshList();

//Menu funksjon----------------------------------
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}
//Menu funksjon slutt----------------------------


let createItemBtn = document.getElementById("createItemBtn");
createItemBtn.addEventListener("click", function () {
    emptyornot();
})
let deleteSelectedBtn = document.getElementById("deleteSelectedBtn");
deleteSelectedBtn.addEventListener("click", function () {
    deleteSelected();
})


//---------------------------------------------
async function deleteSelected() {

    let selected = document.querySelectorAll("input:checked");

    let token = localStorage.getItem('token');


    let fetchSettings = {
        method: 'PUT',
        headers: {
            "x-access-auth": token
        }
    }

    for (let i = 0; i < selected.length; i++) {
        let id = selected[i].dataset.id;

        try {
            let fetchUrl = 'https://mm200-todolist-group2.herokuapp.com/api/element/' + id;
            let response = await fetch(fetchUrl, fetchSettings);
            if (response.status === 200) {
                data = await response.json();
                createListItems(data.rows);
                return data;
            } else {
                throw 'Error';
            }
        } catch (err) {
            return err;
        }


    }


    refreshList();

}

//---------------------------------------------

async function disableList() {
    let token = localStorage.getItem('token');

    let uploadData = {

        active: 0

    }

    let fetchSettings = {
        method: 'PUT',
        headers: {
            "x-access-auth": token,

        },
        body: JSON.stringify(uploadData)
    }


    //kontakte server
    try {

        let url = "https://mm200-todolist-group2.herokuapp.com/api/list";

        let resp = await fetch(url, fetchSettings);
        console.log(resp);
        let data = resp.json();
        console.log(data);
        refreshList();

    } catch (err) {
        console.log(err);
    }
}

//---------------------------------------------

async function refreshList() {
    let data = null;
    let token = localStorage.getItem('token');
    let fetchUrl = 'https://mm200-todolist-group2.herokuapp.com/api/elements/2';
    //let fetchUrl = '/api/elements/2';



    let fetchSettings = {
        method: 'GET',
        headers: {
            "x-access-auth": token
        }
    }

    try {
        let response = await fetch(fetchUrl, fetchSettings);
        if (response.status === 200) {
            data = await response.json();
            createListItems(data.rows);

        } else {
            console.log("ikke status 200");
        }
    } catch (err) {
        console.log(err);

    }
}


//---------------------------------------
function createListItems(arr) {

    ul.innerHTML = "";

    for (let i = 0; i < arr.length; i++) {

        var item = document.getElementById("input").value;
        var itemDate = dateInput.value;

        var div = document.createElement("div");
        div.innerHTML = '<div id="boksen"><input data-id="' + arr[i].id + '" type="checkbox" id="checkmark' + i + '"><label for="checkmark' + i + '"></label></div><input id="todotxt' + i + '" value="' + arr[i].title + '" class="inpstyle" /> <div>' + arr[i].deadline + '</div>';

        var li = document.createElement("li");

        li.id = counter;

        li.appendChild(div);
        ul.appendChild(li);

        li.onkeyup = function (e) {
            if (e.keyCode == 13) {
                input.focus();
            }
        }
    }
}

//---------------------------------------
async function createNewListItem() {
    let token = localStorage.getItem('token');
    let uploadData = {
        title: input.value,
        listid: 1,
        deadline: dateInput.value
    }

    let fetchSettings = {
        method: 'POST',
        headers: {
            "x-access-auth": token
        },
        body: JSON.stringify(uploadData)
    }
    console.log(fetchSettings)
    
    //kontakte server
    try {
        let url = "https://mm200-todolist-group2.herokuapp.com/api/element/2";
        
        let resp = await fetch(url, fetchSettings);
        console.log("resp", resp);
        let data = resp.text();
        console.log("data", data);
        refreshList();
    } catch (err) {
        console.log("catch", err);
    }
}

//---------------------------------------------

async function shareListGlobal() {
    let token = localStorage.getItem('token');
    let uploadData = {
        visibility: 2
    }

    let fetchSettings = {
        method: 'PUT',
        headers: {
            "x-access-auth": token,
        },
        body: JSON.stringify(uploadData)
    }

    //kontakte server
    try {
        let url = "https://mm200-todolist-group2.herokuapp.com/api/list";

        let resp = await fetch(url, fetchSettings);
        console.log(resp);
        let data = resp.json();
        console.log(data);
        refreshList();
    } catch (err) {
        console.log(err);
    }
}

//---------------------------------------------
async function shareListIndividual() {
    let token = localStorage.getItem('token');
    let uploadData = {
        visibility: 1
    }

    let fetchSettings = {
        method: 'PUT',
        headers: {
            "x-access-auth": token,
            body: JSON.stringify(uploadData)
        }
    }


    //kontakte server
    try {
        let url = "https://mm200-todolist-group2.herokuapp.com/api/lists";

        let resp = await fetch(url, fetchSettings);
        console.log(resp);
        let data = resp.json();
        console.log(data);
        refreshList();
    } catch (err) {
        console.log(err);
    }
}

//---------------------------------------------
function emptyornot() {
    if (document.getElementById("input").value == "") {
        alert("An empty todo, is not a todo!");
    } else {
        //newItem();
        createNewListItem();
    }
}

//-------------------------------------------


input.onkeyup = function (e) {
    if (e.keyCode == 13) {
        emptyornot();
    }
};

//---------------------------------------------
