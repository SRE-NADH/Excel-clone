let tr = document.getElementsByClassName("tableheading-row")[0];
let tbody = document.querySelector("table>tbody");
const cellNO = document.getElementById("cellNo");
const boldbutton = document.getElementById("bold");
const italianbutton = document.getElementById('italic');
const underlinebutton = document.getElementById("underline");
const leftbutton = document.getElementById("left");
const centerbutton = document.getElementById("center");
const rightbutton = document.getElementById("right");
const  textcolor = document.getElementById("text-color");
const fillcolor = document.getElementById("fill-color");
const copybutton = document.getElementById("copy");
const cutbutton = document.getElementById("cut");
const pastebutton = document.getElementById("paste");
const uploadbutton = document.getElementById('upload');

const fontStyledropdown = document.getElementById("fontStyle-dropdown");
const fontSizedropdown= document.getElementById('fontSize-dropdown');
const addsheet = document.getElementById("addsheet");
const savesheet = document.getElementById("save");
const sheet1 = document.getElementById("sheet-1");

const functionbar = document.getElementsByClassName("functionbar")[0];
const removebutton = document.getElementById("remove");
const buttoncontainer = document.getElementsByClassName('buttons')[0];

const row=26;
const col=100;
let currentCell;
let previousCell;
const color = '#ddddff';
let currsheet=1;
let numsheet =1;
prevsheet= 1;

let matrix;
function createMatrix(){
    matrix = new Array(row);
for(let i=0;i<row;i++){
    matrix[i] = new Array(col);
    for(let j=0;j<col;j++){
      matrix[i][j]={};
    }
}
}
 createMatrix();

textcolor.addEventListener("click",()=>{
    const input = textcolor.querySelector("input");
    input.click();
    input.addEventListener('input',(e)=>{
        currentCell.style.color=e.target.value;
        updateMatrix();
    })
    if(currentCell.style.color!=''){
        currentCell.style.color='';
    }
})


fillcolor.addEventListener("click",()=>{
    const input = fillcolor.querySelector("input");
    input.click();
    input.addEventListener('input',(e)=>{
        currentCell.style.backgroundColor=e.target.value;
        updateMatrix();
    })
  
})





function addcolumns(parent,child,index){
    for(let i=-1;i<row;i++){
        let innertext="";
        let cellid="";
        // console.log(id)
        if(index==0&&i!==-1){
           innertext =   String.fromCharCode(65+i);
        }
        if(index==0 && i==-1){
            cellid="00";
        }
        let cell = document.createElement(child);
        if(i==-1 && index!=0){
         innertext=index;
        }
        if(i==-1){
            cell.className="fixedcol";
        }
        if(i!=-1 && index!=0){
           cellid=`${String.fromCharCode(65+i)}${index}`;
        }
        cell.innerText=innertext;
        cell.spellcheck=false;
        cell.id=cellid
        
        parent.append(cell);

        
        cell.addEventListener("focus",focusCell);

        cell.addEventListener('input',updateMatrix);


        cell.setAttribute("contenteditable", true);
         //console.log(cell.id);
    }
}

function updateMatrix(){
    let id=  currentCell.id;
    let mcol = id[0].charCodeAt(0)-65;
    let mrow = id.substring(1)-1;
    matrix[mrow][mcol]={
        text:currentCell.innerText,
        style:currentCell.style.cssText,
        id:id
    }
    //  console.log(matrix[mrow][mcol]);
    //  console.log(mrow,mcol);
}

// add first row
addcolumns(tr,"th",0)
createtable();
function createtable(){
    tbody.innerHTML="";
for(let i=1;i<=col;i++){
   let tmprow = document.createElement("tr");
   addcolumns(tmprow,"td",i)
   tbody.append(tmprow);
}
}
function focusCell(e){
    cellNO.innerText=`${e.target.id}`;
    previousCell=currentCell;
    currentCell=e.target;
    
currentCell.style.border= "2px solid blue";
        
    if(previousCell){
      previousCell.style.border='1px solid black';
    }

    buttonHighliter("fontWeight","bold",boldbutton);
    buttonHighliter("fontStyle","italic",italianbutton);
    buttonHighliter("textDecoration","underline",underlinebutton);

}

function buttonHighliter(style,property,button){
    if(currentCell.style[style]==property){
        button.style.backgroundColor=color;
    }
    else{
        button.style.backgroundColor='transparent';
    }
}

// set the first cell fixed
const fixedcell = document.getElementById("00");
fixedcell.style.backgroundColor='black';

boldbutton.addEventListener("click",(e)=>{
    if(currentCell){
    styleAddition("bold","normal","fontWeight",boldbutton);
    }
});


italianbutton.addEventListener('click',(e)=>{
    if(currentCell){
        styleAddition("italic","normal","fontStyle",italianbutton);
     }
})

underlinebutton.addEventListener('click',(e)=>{
    if(currentCell){
        styleAddition("underline","none","textDecoration",underlinebutton);
     }
})


function styleAddition(property,normal,stylep,button){
    if(currentCell.style[stylep]==property){
      currentCell.style[stylep]=normal; 
      button.style.backgroundColor='transparent';
    }
    else
    {
        currentCell.style[stylep]=property; 
        button.style.backgroundColor=color;
    }
    updateMatrix();
}

leftbutton.addEventListener("click",(e)=>{
    aligncontent('left');
})

centerbutton.addEventListener("click",(e)=>{
    aligncontent('center');
})
rightbutton.addEventListener("click",(e)=>{
    aligncontent('right');
})

function aligncontent(property){
      if(currentCell){
        currentCell.style.textAlign=property;
      }
      updateMatrix();
}

fontStyledropdown.addEventListener("change",()=>{
    currentCell.style.fontFamily = fontStyledropdown.value;
    updateMatrix();
})

fontSizedropdown.addEventListener('change',(e)=>{
    currentCell.style.fontSize= fontSizedropdown.value;
    updateMatrix(); 
})

let lastpress="";
let data={};
let flag="";

copybutton.addEventListener("click",(e)=>{
    if(!currentCell) return;
    data = {
        text:currentCell.innerText,
        style:currentCell.style.cssText
    }
    if(flag=="cut"){
        cutbutton.style.backgroundColor="transparent";
    }
    e.target.style.backgroundColor=color;
    flag="copy"
})

cutbutton.addEventListener("click",(e)=>{
    if(!currentCell) return;
    data={
        text:currentCell.innerText,
        style:currentCell.style.cssText
    }
    currentCell.innerText='';
    currentCell.style='';
    updateMatrix();
    if(flag=="copy"){
        copybutton.style.backgroundColor="transparent";
    }
    e.target.style.backgroundColor=color;
    flag="cut";
})

pastebutton.addEventListener("click",(e)=>{
    
    if(data!={}){
       currentCell.innerText=data.text;
       currentCell.style=data.style;
    updateMatrix();
    data={};
    }
    copybutton.style.backgroundColor='transparent';
    cutbutton.style.backgroundColor = 'transparent';
})

function downloadmatrix(){
    const matrixstring = JSON.stringify(matrix);

    const blob = new Blob([matrixstring],{type:'appliacation/json'});

    const link = document.createElement("a");
    link.href=URL.createObjectURL(blob);
    link.download='table.json';
    link.click();
}

uploadbutton.addEventListener('click',()=>{
    const upload = document.getElementById('uploadinput');
    upload.click();
    upload.addEventListener('input',uploadmatrix);
})

function uploadmatrix(e){
  
    const file = e.target.files[0];

    if(file){
        const reader = new FileReader();
        reader.readAsText(file);
        // readastext trigger onload method
         
        reader.onload=function(e){
        const fileContent = JSON.parse(e.target.result);

        matrix = fileContent;
        createtable()
        renderMatrix();
        }
    }
}


function renderMatrix(){
    matrix.forEach((row)=>{
        row.forEach(Element=>{
            if(Element.id){
              let cell = document.getElementById(Element.id);
              cell.innerText = Element.text;
              cell.style = Element.style;
              cell.style.border="1px solid black";
            }
          })
    })
}
function createsheetbutton(){
    numsheet++;
    currsheet=numsheet;
    let button = document.createElement("button");
    button.innerText = `sheet${currsheet}`;
    button.id = `sheet-${currsheet}`;
    buttoncontainer.append(button);
    button.setAttribute("onclick",'viewsheet(event)');
    sheetButtonHighliter();
    prevsheet=numsheet;
}

addsheet.addEventListener("click",addsheetfun) ;

function addsheetfun(){
    saveToSectionStorage();

    createsheetbutton();
  
    createMatrix();

   createtable();
}

removebutton.addEventListener("click",removesheet);

sheet1.addEventListener("click",viewsheet);

function removesheet(){
    if(currsheet==1){
        return;
    }
    let button = document.getElementById(`sheet-${currsheet}`);
    let tmparr = JSON.parse(sessionStorage.getItem('arrMatrix'))
    tmparr.splice(currsheet-1,1);
    console.log(tmparr[currsheet-1]);
    sessionStorage.setItem('arrMatrix', JSON.stringify(tmparr));
    createsheets();
    button.remove();
    sheetButtonHighliter();
}

function viewsheet(e){
    let id = e.target.id;
    if(currsheet==id.split('-')[1]){
        return;
    }
    currsheet = id.split('-')[1];
     let tmparr = JSON.parse(sessionStorage.getItem('arrMatrix'));
     //if(prevsheet!=1){
     tmparr[prevsheet-1]=matrix;
     sessionStorage.setItem('arrMatrix', JSON.stringify(tmparr));
    // }

     matrix=tmparr[currsheet-1];
     if(matrix==undefined){
        createMatrix();
     }
    //console.log(matrix);
    createtable();
    renderMatrix();
    sheetButtonHighliter();
    prevsheet=currsheet;
}


function saveToSectionStorage(){
    if (sessionStorage.getItem('arrMatrix')) {
        // pressing add sheet not for the first time
        let tempArrMatrix = JSON.parse(sessionStorage.getItem('arrMatrix'));
        tempArrMatrix[currsheet-1]=matrix;
        sessionStorage.setItem('arrMatrix', JSON.stringify(tempArrMatrix));
      } else {
        // pressing add sheet for the first time
        let tempArrMatrix = [matrix];
        sessionStorage.setItem('arrMatrix', JSON.stringify(tempArrMatrix));
      }
}
 





 // load current sheet 
 function loadcurrentsheet(array){
    
    matrix=array[currsheet-1];
    createtable();
    renderMatrix();
 }
  
 function createsheets(){
  buttoncontainer.innerHTML="";
  numsheet=0;
  currsheet=0;
  prevsheet=0;
    let aarr = sessionStorage.getItem('arrMatrix');
    if(aarr){
        let array = JSON.parse(aarr);
        let n = array.length;
        for(let i=0;i<n;i++){
            createsheetbutton();
     }
     loadcurrentsheet(array);
 }
 }

 let checkarr = sessionStorage.getItem('arrMatrix');
 if(checkarr) {
    createsheets(); 
}// work when refresh
else{
    sheetButtonHighliter(); // for starting purpose
}

 function sheetButtonHighliter(){
    let button = document.getElementById(`sheet-${currsheet}`);
    button.style.backgroundColor=color;
    if(prevsheet!=currsheet && prevsheet!=0){
        let prevbutton = document.getElementById(`sheet-${prevsheet}`);
        prevbutton.style.backgroundColor='transparent'
    }
 }
