// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다
// delete 버튼을 누르면 할일이 삭제된다
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 1. check 버튼을 클릭하는 순간 true false
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false이면 안끝난걸로 간주하고 그대로

// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝난탭은, 끝난 아이템만. 진행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴


let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let taskList = [];
let filterList =[];
let mode ="all";

addButton.addEventListener("mousedown",addTask);

taskInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});

for(let i=0; i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){filter(event)});
}

console.log(tabs);

function addTask(){
    let task ={
        id : randomIDGenerate(),
        taskContent : taskInput.value,
        isComplete : false
    }
    taskList.push(task);
    taskInput.value = "";
    console.log(taskList);
    render();
}

function render(){
    let resultHTML = "";
    list = [];
    if(mode =="all"){
        list = taskList;
    }else{
        list = filterList;
    }


    
    for(let i = 0; i < list.length;i++){
        if(list[i].isComplete){
            
            resultHTML += `<div class="task task-background">
            <span class="task-done">${list[i].taskContent}</span>
            
            <div class="button-box">
                <button onclick="toggleComplete('${list[i].id}')">
                <i class="fa-solid fa-rotate-left"></i>
                </button>
                <button onclick="deleteTask('${list[i].id}')">
                <i class="fa-solid fa-trash-can"></i>
                </button>
            
            </div>
            
        </div>`;
        }else{
            resultHTML += `<div class="task">
            <span>${list[i].taskContent}</span>
            <div class="button-box">
                <button onclick="toggleComplete('${list[i].id}')">
                <i class="fa-solid fa-check"></i>
                </button>
                <button onclick="deleteTask('${list[i].id}')">
                <i class="fa-solid fa-trash-can"></i>
                </button>
                
            </div>
        </div>`;
        }

    }
    


    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    console.log("id",id);
    for(let i = 0; i<taskList.length;i++){
        if(taskList[i].id === id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
    
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

function deleteTask(id){
    for(let i = 0; i<taskList.length;i++){
        if(taskList[i].id === id){
            taskList.splice(i,1);
            
        }
    }
    filter();
    
}

function filter(event){
    if(event){
        mode = event.target.id;

        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.top = event.target.offsetTop + (event.target.offsetHeight -4) + "px";
    }
    filterList =[];
    if(mode === "ongoing"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i])
            }
        }
    }
    else if (mode ==="done"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete){
                filterList.push(taskList[i])
            }
        }
    }
    render();
    
}

