
//Menu funksjon----------------------------------
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}
//Menu funksjon slutt----------------------------------

//var garbage = document.getElementById("garbage");
var ul = document.getElementById("list");
var input = document.getElementById("input");
var dateInput = document.getElementById("date");
var counter = 0;
var teller = 0;

//garbage.ondragover = dragOver;
//garbage.ondrop = dropDelete;


refreshList();


let createItemBtn = document.getElementById("createItemBtn");
createItemBtn.addEventListener("click", function () {
    emptyornot();
})
let deleteSelectedBtn = document.getElementById("deleteSelectedBtn");
deleteSelectedBtn.addEventListener("click", function () {
    deleteSelected();
})

/*
let shareListGlobalBtn = document.getElementById("shareListGlobalBtn");
shareListGlobalBtn.addEventListener("click", function () {
    shareListGlobal();
})


let shareListIndividualBtn = document.getElementById("shareListIndividualBtn");
shareListIndividualBtn.addEventListener("click", function () {
    shareListIndividual();
})

*/

//---------------------------------------------
async function deleteSelected() {

    let selected = document.querySelectorAll("input:checked");

    let token = localStorage.getItem('token');
    

    let fetchSettings = {
        method: 'DELETE',
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


//--------------------------
function createListItems(arr) {

    ul.innerHTML = "";

    for (let i = 0; i < arr.length; i++) {

        var item = document.getElementById("input").value;
        var itemDate = dateInput.value;

        /* var div = document.createElement("div");
         div.innerHTML = '<div id="boksen"><input type="checkbox" id="checkmark' + teller + '"><label for="checkmark' + teller + '"></label></div><span id="todotxt' + teller + '">' + item + '</span>';*/

        var div = document.createElement("div");
        div.innerHTML = '<div id="boksen"><input data-id="' + arr[i].id + '" type="checkbox" id="checkmark' + i + '"><label for="checkmark' + i + '"></label></div><input id="todotxt' + i + '" value="' + arr[i].title + '" class="inpstyle" /> <div>' + arr[i].deadline + '</div>';
        //input type="date"

        //Redigering av listeelementene, fortsatt problemer med ENTER for å "lagre" det nye
        //var todotxt = document.getElementById("todotxt" + teller);
        //document.getElementById("todotxt" + teller).contentEditable = "true";

        var li = document.createElement("li");

        /* li.draggable = true;
         li.ondragstart = startDrag;*/
        li.id = counter;

        //li.ondrop = dropMove;
        //li.ondragover = dragOver;

        li.appendChild(div);
        ul.appendChild(li);

        li.onkeyup = function (e) {
            if (e.keyCode == 13) {
                input.focus();
            }

        }

    }
}

//--------------------------
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

async function shareListGlobal() {
    let token = localStorage.getItem('token');

    let uploadData = {

        visibility: 2

    }

    let fetchSettings = {
        method: 'POST',
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

async function shareListIndividual() {
    let token = localStorage.getItem('token');

    let uploadData = {

        visibility: 1

    }

    let fetchSettings = {
        method: 'POST',
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

/*
    //--------------------------
    function newItem() {
        counter++;
        teller++;
        var item = document.getElementById("input").value;
        var itemDate = dateInput.value;

         var div = document.createElement("div");
         div.innerHTML = '<div id="boksen"><input type="checkbox" id="checkmark' + teller + '"><label for="checkmark' + teller + '"></label></div><span id="todotxt' + teller + '">' + item + '</span>';

        var div = document.createElement("div");
        div.innerHTML = '<div id="boksen"><input type="checkbox" id="checkmark' + teller + '"><label for="checkmark' + teller + '"></label></div><input id="todotxt' + teller + '" value="' + item + '" class="inpstyle" /> <div>' + itemDate + '</div>';
        //input type="date"

        //Redigering av listeelementene, fortsatt problemer med ENTER for å "lagre" det nye
        //var todotxt = document.getElementById("todotxt" + teller);
        //document.getElementById("todotxt" + teller).contentEditable = "true";

        var li = document.createElement("li");

        li.draggable = true;
        li.ondragstart = startDrag;
        li.id = counter;

        //li.ondrop = dropMove;
        //li.ondragover = dragOver;

        li.appendChild(div);
        ul.appendChild(li);

        li.onkeyup = function (e) {
            if (e.keyCode == 13) {
                input.focus();
            }

        };


        document.getElementById("input").value = "";
        //li.onclick = removeItem;

    }

*/

//----------------------------


//Denne funksjonen spør input-feltet om veriden er null, hvis den er det kjører den en alert. Men dersom det er noe i input feltet kjører den newItem funksjonen og legger til en ny TODO, TADA!
function emptyornot() {
    if (document.getElementById("input").value == "") {
        alert("An empty todo, is not a todo!");
    } else {
        //newItem();
        createNewListItem();
    }
}

//----------------------------


input.onkeyup = function (e) {
    if (e.keyCode == 13) {
        emptyornot();
    }

};
