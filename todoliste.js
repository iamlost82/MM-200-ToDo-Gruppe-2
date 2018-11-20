//var garbage = document.getElementById("garbage");
var ul = document.getElementById("list");
var input = document.getElementById("input");
var counter = 0;
var teller = 0;

//garbage.ondragover = dragOver;
//garbage.ondrop = dropDelete;

//--------------------------
function newItem() {
    counter++;
    teller++;
    var item = document.getElementById("input").value;

   /* var div = document.createElement("div");
    div.innerHTML = '<div id="boksen"><input type="checkbox" id="checkmark' + teller + '"><label for="checkmark' + teller + '"></label></div><span id="todotxt' + teller + '">' + item + '</span>';*/
    
    var div = document.createElement("div"); 
    div.innerHTML = '<div id="boksen"><input type="checkbox" id="checkmark' + teller + '"><label for="checkmark' + teller + '"></label></div><input id="todotxt' + teller + '" value="' + item + '" class="inpstyle" />';
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

};


    document.getElementById("input").value = "";
    //li.onclick = removeItem;

}

//---------------------






//---------------------


//Denne funksjonen spør input-feltet om veriden er null, hvis den er det kjører den en alert. Men dersom det er noe i input feltet kjører den newItem funksjonen og legger til en ny TODO, TADA!
function emptyornot() {
    if (document.getElementById("input").value == "") {
        alert("An empty todo, is not a todo!");
    } else {
        newItem();
    }
}



input.onkeyup = function (e) {
    if (e.keyCode == 13) {
        emptyornot();
    }

};


//----------------------------





/*function removeItem(e) {
  e.target.parentElement.removeChild(e.target);
}*/

//----------------------------
/*function startDrag(evt) {
    evt.dataTransfer.setData("liDragged", evt.currentTarget.id);

}
//-------------------------
function dropDelete(evt) {
    var id = evt.dataTransfer.getData("liDragged");

    console.log(id);
    var li = document.getElementById(id);
    ul.removeChild(li);

}
//-------------------------

function dropMove(evt) {
    var movedId = evt.dataTransfer.getData("liDragged");
    var targetId = evt.currentTarget.id;


    var moved = document.getElementById(movedId);
    var target = document.getElementById(targetId);

    console.log(moved);
    console.log(target);

    ul.insertBefore(moved, target);

}
//-----------------------------

function dragOver(evt) {
    evt.preventDefault();
}
*/
