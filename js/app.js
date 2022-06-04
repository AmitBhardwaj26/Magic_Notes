console.log("hello");

showNotes(); //call the old alredy inserted notes

// take the text that user enter and enter it into localstorage
let addBtn = document.getElementById('addBtn');

// target addBtn class
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    // target the text written by user 
    let notes = localStorage.getItem("notes");
    // old notes in local storage

    if (notes == null) {
        notesObj = []; // insilize a array
    } else {
        notesObj = JSON.parse(notes);
        // JSON. parse() is a crucial method for converting JSON data in string form into Javascript objects.

    }
    notesObj.push(addTxt.value); //push into array
    localStorage.setItem("notes", JSON.stringify(notesObj));
    //set into localhost
    addTxt.value = " "; //set user text area to empty
    console.log(notesObj);
    showNotes(); //to print it from local storage

})

//function to show elements from localstorage
function showNotes() {
    let notes = localStorage.getItem("notes"); 
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = ""; // the text from local storage and store in html string and i.e made a new from and insert it to screen

    for (let index = 0; index < notesObj.length; index++) {
        html += `
    <div class="notecard my-2 mx-2 card" style="width: 18rem">

     <div class="card-body">
      <h5 class="card-title">Note ${index+1 } </h5>
      <p class="card-text"> ${ notesObj[index]  } </p>
      <button  id="${index}" onclick="deleteNode(this.id)" class="btn btn-primary" >Delete Note</button>
      <button  id="${index}" onclick="editNode(this.id)" class="btn btn-primary" >Edit Note</button>
     </div>
      </div> `;
        //appending into string html

    }

    let noteselm = document.getElementById('notes');
    
    if (notesObj.length != 0) {
        noteselm.innerHTML = html; //insert all string into div tab of html using targeting notes
    }
    else 
    {
       let a= `Nothing to Show Use "Add a Note" section above to add Notes.` ;
       noteselm.innerHTML= a; //if html text is impty then print this text 
    }

}


//function to delete a note
function deleteNode(index)
{
    //console.log("this is a deleted node"); 
     
    let notes = localStorage.getItem("notes"); //read from local storage
    if (notes == null) {
        notesObj = [];  
    } else {
        notesObj = JSON.parse(notes); //convert to string
    }

    notesObj.splice(index,1);  // delete one element after index
    localStorage.setItem("notes", JSON.stringify(notesObj)); // set the local storage
    //set into localhost
    showNotes();
     
}


//search function
let search=document.getElementById("searchTxt");

//attach a event listner whenever user write any input to it
search.addEventListener("input",function()
{
   //console.log("search is pressed"); // check for is this function triggered or not
    let inputVal = search.value.toLowerCase(); //user query may be in upper case convert into lower case
     
    let noteCards= document.getElementsByClassName('notecard'); //select all the alredy inserted notes noteCards stores an array of all notes
     

    for (let index = 0; index < noteCards.length; index++) { //traverse and check in each note
        
        let element=noteCards[index]; //string of single note
        let cardTxt = element.getElementsByTagName("p")[0].innerText; //select the inner html of paragraph tag 
         if(cardTxt.includes(inputVal))   {      // check if input vlaue matches in paragraph tag or not
         element.style.display= "block"; // it is the display property by block or lock on screen
         }
        else  {
            element.style.display= "none"; // does not display
        }
        //console.log(cardTxt);
    }
})


// function to edit the node
// function editNode(index)
// {
//    //console.log("edit node is fired"); //check if function calls or not
   
//    let noteCards= document.getElementsByClassName('notecard'); // point all the wrtten nodes in localstorage
    
//     let element=noteCards[index]; //string of single note
//     let cardTxt = element.getElementsByTagName("p")[0].innerText; //select the inner html of paragraph tag 
//     // console.log(cardTxt);

//     let Changes=prompt("enter the text",cardTxt); // print and take the chages from the user

//     if(Changes!=null && Changes!=cardTxt) // if user really do the changes
//     {
//       let notes = localStorage.getItem("notes"); //read from local storage
//     if (notes == null) {
//         notesObj = [];  // insitize the array
//     } else {
//         notesObj = JSON.parse(notes); //convert to string
//     }

//     notesObj.splice(index,1,Changes); 
//      //array.splice(insertAtIndex, itemsToRemove, 'insert this string on index 0')
//      // splice can delete the elements if(2 components are given else insert also)

//     localStorage.setItem("notes", JSON.stringify(notesObj)); // set the local storage
//     //set into localhost
//    }
//     showNotes();  // show the notes

// }


function editNode(index)
{
   //console.log("edit node is fired"); //check if function calls or not
   
   let noteCards= document.getElementsByClassName('notecard'); // point all the wrtten nodes in localstorage
    
   let ele=noteCards[index];
    let element=ele.getElementsByTagName("p")[0]; //string of single note
    let cardTxt = element.innerText; //select the inner html of paragraph tag 
    // console.log(cardTxt);
       
    let html= `<textarea id="textarea" class="textarea form-control" id="addTxt" rows="3">${cardTxt} </textarea>`;
    console.log(html);
    element.innerHTML=html;
    
    let textarea=document.getElementById('textarea');
    console.log(textarea);
    textarea.addEventListener('blur',function() {
               element.innerHTML=textarea.value;
               
              localStorage.setItem('text',textarea.value);
    })


}
