var garbage = document.getElementById("garbage");
var ul = document.getElementById("list");
var counter = 0;

garbage.ondragover = dragOver;
garbage.ondrop = dropDelete;

//--------------------------
function newItem() {
    counter ++;
  
  
    
    
  var item = document.getElementById("input").value;
  
  var li = document.createElement("li");
  li.draggable = true;
  li.ondragstart = startDrag;
  li.id = counter;
  
  li.ondrop = dropMove;
  li.ondragover = dragOver;
    
    
  li.appendChild(document.createTextNode("- " + item));
  ul.appendChild(li);
  document.getElementById("input").value = "";
  //li.onclick = removeItem;
}
//----------------------------
  document.body.onkeyup = function(e) {
  if (e.keyCode == 13) {
      
    newItem();
  }
};

/*function removeItem(e) {
  e.target.parentElement.removeChild(e.target);
}*/

//----------------------------
function startDrag(evt){
    evt.dataTransfer.setData("liDragged", evt.currentTarget.id);
    
}
//-------------------------
 function dropDelete(evt){
     var id = evt.dataTransfer.getData("liDragged");
     
     console.log(id);
     var li = document.getElementById(id);
     ul.removeChild(li);
     
 }
//-------------------------

 function dropMove(evt){
     var movedId = evt.dataTransfer.getData("liDragged");
     var targetId = evt.currentTarget.id;
     
    
     var moved = document.getElementById(movedId);
     var target = document.getElementById(targetId);
     
     console.log(moved);
     console.log(target);
     
     ul.insertBefore(moved,target);
    
}
//-----------------------------

function dragOver(evt){
    evt.preventDefault();
}

















