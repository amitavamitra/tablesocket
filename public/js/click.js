const tab = document.getElementById('tblMain');
const chatMessages = document.querySelector('.form-control');
const roomName = document.getElementById('room-name');
var  docActiveElement = document.activeElement.name;
const userList = document.getElementById('users');
var matnr =  document.getElementById('matnr');
var matnr_user =  document.getElementById('matnr_user');
var matkx =  document.getElementById('matkx');
var matkx_user =  document.getElementById('matkx_user');
var mbrsh =  document.getElementById('mbrsh');
var mbrsh_user =  document.getElementById('mbrsh_user');
var matkl =  document.getElementById('matkl');
var matkl_user =  document.getElementById('matkl_user');
var matyp =  document.getElementById('matyp');
var matyp_user =  document.getElementById('matyp_user');
var meins =  document.getElementById('meins');
var meins_user =  document.getElementById('meins_user');
var freeze = document.getElementById('freeze');
var freeze_user = document.getElementById('freeze_user');
var utyping = document.getElementById('username');
var material = [];
var material_bc = [];
var itscontent = document.getElementById('itscontent');

var timeout=undefined;
// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();
var keyCode = "";


// Message from server
socket.on('message', (message) => {
  // console.log(message);
  outputMessage(message);
});

// Message from server
socket.on('typing', (data) => {
  // console.log(data);
  userTyping(data);
});

// Output message to DOM
function userTyping(data) {
  console.log(data)
}

// Listen for events

// 1. When table cell is clicked.

// tab.addEventListener('click',function(){
//   // determine the cell that was clicked.
  
//   $(".use-address").click(function() {
//     var $item = $(this).closest("tr")   // Finds the closest row <tr> 
//                        .find(".nr")     // Gets a descendent with class="nr"
//                        .text();         // Retrieves the text within <td>

//     $("#resultas").append($item);       // Outputs the answer
// });

// })



// Receiving the typing data

socket.on('typing',function(data){
 
  console.log('typing data :',data)

})

var  rowClicked  = "";
var colClicked = "";
var  tblCell = [];

tab.addEventListener('click',function(){
    var tbl = document.getElementById("tblMain");
    if (tbl != null) {
        for (var i = 0; i < tbl.rows.length; i++) {
            for (var j = 0; j < tbl.rows[i].cells.length; j++)
                tbl.rows[i].cells[j].onclick = function () { getval(this); };
                        }
    }
    function getval(cel) {
      tblCell = [];
    cellClicked = cel.parentNode.rowIndex;
    colClicked  = cel.cellIndex;
    tblCell.push(cellClicked);
    tblCell.push(colClicked);
    // this.cellIndex + ", " + this.parentNode.rowIndex
    cel.addEventListener("click", clickCell, false);

  
      }

      function clickCell(e) {
        // clear the background of all rows
        var rows = document.getElementById('tblMain').rows;
        for(var i = 0; i < rows.length; i++) {
            rows[i].style.backgroundColor = '';
        }
        // set background of clicked row
        this.style.backgroundColor = 'purple';
        cellClicked.backgroundColor = this.style.backgroundColor;
    }
socket.emit('clicked' , tblCell);

})

// Find which cell was clicked and its text..
// Lets emit this value and
//  the question is getting it back via socket.on..
document.querySelector("#tblMain tbody").addEventListener("click", function(event) {
  var td = event.target;
  while (td !== this && !td.matches("td")) {
      td = td.parentNode;
  }
  if (td === this) {
      console.log("No table cell found");
  } else {
      console.log(td.innerText);
  }
socket.emit('td', td.innerText);
});


// function clickHandler() {
//   // Here, `this` refers to the element the event was hooked on
//   console.log("clicked")

//   itscontent.innerText = getval(this);
//  console.log(getval(this));
// }
// document.querySelectorAll('#tblMain td')
// .forEach(e => e.addEventListener("click", clickHandler));


// This is neat and works 

// var itscontent = document.getElementById('itscontent');
// itscontent.addEventListener('keyup', function(e){
//   itscontent.value =  itscontent.value;
//   socket.emit('keyup',itscontent.value);
//   // console.log(itscontent.value) 
// });
socket.on('keyup',function(data){
  itscontent.value = data;
})


tblCell =[];
//  Listening to which cell was clicked.
socket.on('clicked' , function(data){
        
    tblCell = data;
    // document.getElementById('clickedcell').value = rowClicked;
    console.log('******cell data coming from server')
    console.log(tblCell);
    console.log('******cell data coming from server')
    // document.getElementById('tblMain').rows[rowClicked].cell.length;
})
// Ok we got the value or cell data
socket.on('td',function(data){
  console.log('******td data coming from server')
   console.log(data);
  console.log('******td data coming from server')
})


// Message submit

// Message from server

// Js fiddle help

// http://jsfiddle.net/8A37s/5/ - tells about the content of the cell on click..
//https://stackoverflow.com/questions/21033368/javascript-onclick-event-html-table
// The last one is about eventlistener to each cell of the table.

// yet another amazing fiddle , https://jsfiddle.net/jfriend00/1j7vkfma/ .
//  this is on keyup , logs which cell was gettting typed..
// if I can log that content - done !!
// background style and color changes on keypress and keyup..


// Just add all empty row as rowNum from socket.on rowNum.
function emptyRow(rowNum) {
  var empTab = document.getElementById('empTable');
  //  console.log(material_bc);
   var rowCnt = empTab.rows.length;   // table row count.
  // var rowCnt = rowNum;// on every emit we commnunite the total number of row..
   var tr = empTab.insertRow(rowCnt); // the table row.
   tr = empTab.insertRow(rowCnt);

   for (var c = 0; c < arrHead.length; c++) {
       var td = document.createElement('td'); // table definition.
       td = tr.insertCell(c);

       if (c == 0) {      // the first column.
           // add a button in every new row in the first column.
           var button = document.createElement('input');
           // set input attributes.
           button.setAttribute('type', 'button');
           button.setAttribute('value', 'remove');
           button.setAttribute('id','rmbtm');
           button.setAttribute('class', 'comp');
           // button.
           // add button's 'onclick' event.
           button.setAttribute('onclick', 'removeRow(this)');
           td.appendChild(button);
       }
       if (c == 1) {      // the second column.

        // add materials as dropdown options - later
           var ele = document.createElement('input');
           ele.setAttribute('type', 'text');
           ele.setAttribute('id','rownum');
           ele.setAttribute('value', rowNum);
           ele.setAttribute('class', 'comp');
           td.appendChild(ele);             
       }
       if (c == 2) { // the third column.
            // add materials as dropdown options
            var ele = document.createElement('input');
            ele.setAttribute('type', 'text');
            ele.setAttribute('id','component');
            //  run a for loop at material_bc ? for description ?
            // ele.setAttribute('value', '');
            ele.setAttribute('class', 'comp');
                  td.appendChild(ele);
            }

            if (c == 3) { // the third column.
            // add materials as dropdown options
            var ele = document.createElement('input');
            ele.setAttribute('type', 'text');
            ele.setAttribute('id','desc');
            ele.setAttribute('value', '');
            ele.setAttribute('class', 'comp');
            td.appendChild(ele);
            }

            if (c == 4) { // the second column.
              // add materials as dropdown options
              var ele = document.createElement('input');
              ele.setAttribute('type', 'text');
              ele.setAttribute('id','qty');
              ele.setAttribute('value', '');
              ele.setAttribute('class', 'comp');
              td.appendChild(ele);
               }

               if (c == 5) { // the second column.
                // add materials as dropdown options
                var ele = document.createElement('input');
                ele.setAttribute('type', 'text');
                ele.setAttribute('id','unit');
                ele.setAttribute('value', 'EA');
                ele.setAttribute('class', 'comp');
                td.appendChild(ele);
                 }

       }

}

function outputRoomName(room) {
  roomName.innerText = room;
}
// Add users in room to DOM
function outputUsers(users) {
      userList.innerHTML = '';
      users.forEach((user) => {
        const li = document.createElement('li');
        li.innerText = user.username;
        userList.appendChild(li);
      });
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
      if (leaveRoom) {
        window.location = '../index.html';
      } 
});

// Add the table for components
// createTable
//  Can we move this bit of table to another js ?
var arrHead = new Array();	// array for header.
arrHead = ['','ItemNumber' ,'Component','Description', 'Quantity', 'Unit'];

// first create TABLE structure with the headers. 
function createTable() {
    var empTable = document.createElement('table');
    empTable.setAttribute('id', 'empTable'); // table id.

    var tr = empTable.insertRow(-1);
    for (var h = 0; h < arrHead.length; h++) {
        var th = document.createElement('th'); // create table headers
        th.innerHTML = arrHead[h];
        tr.appendChild(th);
    }

    var div = document.getElementById('cont');
    div.appendChild(empTable);  // add the TABLE to the container.
}
