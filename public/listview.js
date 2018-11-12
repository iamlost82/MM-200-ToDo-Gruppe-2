let selected;
let container;
let data;

function createListView(model){
    data = model;
    //console.log(model)
    container = document.createElement("div")
    container.id = "tabell";  
  
    for(let i = 0; i < model.length; i++ ){ //teller, test, øke.
    
        let listItem = document.createElement("div");
        listItem.onclick = click; //ListItem er currenttarget i funksjonen click.
        listItem.id = i;
        listItem.innerHTML = `<h3>${model[i].name}</h3>
                              <p>${model[i].description}</p>
                                <img src="${model[i].img_small}" />
                                <p>Kr ${model[i].price},-</p>
`
                            
        container.appendChild(listItem);
    
    }
   
     return container;
    
}



function click(evt){
    //evt.currentTarget.id = ;  //currentTarget refererer til elementer hvis hendelseslytter utløste hendelsen , mens Target returnerer elementet som utløste hendelsen. 
  
    //evt.target.css("background", "url(minusSign.jpg)")
    //evt.currentTarget.style.visibility = "hidden";
    //console.log(evt.currentTarget);
    
    
    if(selected){
        selected.classList.remove("highlight");
    }
    selected = evt.currentTarget; //currentTarget - koblet til eventet.
    
    selected.classList.add("highlight");
    
    //evt.currentTarget.classList.toggle("highlight");
   //evt.currentTarget.classList.remove("highlight");
   
    
    let myEvent = new Event("choco_select");
    myEvent.data = data[evt.currentTarget.id]; //array.
    myEvent.index = evt.currentTarget.id;
    container.dispatchEvent(myEvent); //trigger den til å kjøre.   
   
   
    
     
}



 




    