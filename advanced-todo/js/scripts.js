//element selection
const todo_place = document.querySelector(".todoplace");
const done_place = document.querySelector(".donetodo");
const edit_div = document.querySelector(".editdiv");

const todo_list = document.querySelector(".todolist");
const done_list = document.querySelector(".donelist");

const todoForm = document.querySelector("#todoform");
const todoInput = document.querySelector("#todoinput");
const searchInput = document.querySelector("#searchinput");

const editForm = document.querySelector("#editform-todo");
const editInput = document.querySelector("#editinput-todo");
const cancelEdit = document.querySelector("#cancel-todo");

const filter = document.querySelector("#filterselect");


//functions
function savetodo(text){

    /*<div class="todo">
        <h3>trying to reach a goal...</h3>
        <button class="finishtodo">
            <i class="fa-solid fa-check"></i>
        </button>
        <button class="edittodo-todo">
            <i class="fa-solid fa-pen"></i>
        </button>
        <button class="removetodo-todo">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>*/

    const tododiv = document.createElement("div");
    tododiv.classList.add("todo");

    const todotitle = document.createElement("h3");
    todotitle.innerText = text;
    tododiv.appendChild(todotitle);

    const done_button = document.createElement("button");
    done_button.classList.add("finishtodo");
    done_button.innerHTML = '<i class="fa-solid fa-check"></i>';
    tododiv.appendChild(done_button);

    const edit_button = document.createElement("button");
    edit_button.classList.add("edittodo-todo");
    edit_button.innerHTML = '<i class="fa-solid fa-pen"></i>';
    tododiv.appendChild(edit_button);

    const remove_button = document.createElement("button");
    remove_button.classList.add("removetodo-todo");
    remove_button.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    tododiv.appendChild(remove_button);

    todo_list.appendChild(tododiv);
    todoInput.value = null;
    todoInput.focus();
}

function endtodo(target, achievement_text){

    /*<div class="done">
        <h3>showing an achievement</h3>
        <button class="removetodo-done">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>*/

    const donediv = document.createElement("div");
    donediv.classList.add("done");

    const done_text = document.createElement("h3");
    done_text.innerText = achievement_text;
    donediv.appendChild(done_text);

    const remove_button_done = document.createElement("button");
    remove_button_done.classList.add("removetodo-done");
    remove_button_done.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    donediv.appendChild(remove_button_done);

    done_list.appendChild(donediv);
    target.remove();
}

var edit_target;
function edit_menu(target){
    edit_target = target;
    edit_div.classList.toggle("hide");
    todo_place.classList.toggle("hide");
    done_place.classList.toggle("hide");
    editInput.value = target.querySelector("h3").innerText;
    edit_div.querySelector(".todoedit").querySelector("h3").innerText = target.querySelector("h3").innerText;
}
function submit_edit(edit){
    edit_target.querySelector("h3").innerText = edit;
    edit_menu(edit_target);
}

function is_substring(t1, t2){
    let nt1 = (t1.length>t2.length?t1:t2);
    let nt2 = (t1.length>t2.length?t2:t1);
    var subresult;
    for(var i=0; i<=nt1.length-nt2.length; i++){
        subresult = true;
        for(var ii=i; ii<nt2.length+i; ii++){
            //console.log(nt1[i], "-", nt1[ii], nt2[ii-i]);
            if(nt1[ii]==nt2[ii-i] && subresult) subresult=true;
            else subresult = false;
        }
        if(subresult) return true;
    }
    return false;
}
function search(search_string){
    const todos = document.querySelectorAll(".todo");
    const dones = document.querySelectorAll(".done");
    todos.forEach(element => {
        if(!is_substring(element.querySelector("h3").innerText, search_string)){
            if(!element.classList.contains("hide")) element.classList.add("hide");
        }
        else{
            if(element.classList.contains("hide")) element.classList.remove("hide");
        }
    });
    dones.forEach(element => {
        if(!is_substring(element.querySelector("h3").innerText, search_string)){
            if(!element.classList.contains("hide")) element.classList.add("hide");
        }
        else{
            if(element.classList.contains("hide")) element.classList.remove("hide");
        }
    });
}

function filter_for(target_filter){
    if(target_filter=="all"){
        if(todo_place.classList.contains("hidefilter")) todo_place.classList.remove("hidefilter");
        if(done_place.classList.contains("hidefilter")) done_place.classList.remove("hidefilter");
    }
    if(target_filter=="completed"){
        if(!todo_place.classList.contains("hidefilter")) todo_place.classList.add("hidefilter");
        if(done_place.classList.contains("hidefilter")) done_place.classList.remove("hidefilter");
    }
    if(target_filter=="todo"){
        if(todo_place.classList.contains("hidefilter")) todo_place.classList.remove("hidefilter");
        if(!done_place.classList.contains("hidefilter")) done_place.classList.add("hidefilter");
    }
}


//events
document.addEventListener("click", (e)=>{
    e.preventDefault();
    const target_element = e.target;
    const parent_element = target_element.closest("div");

    // sidebar events
    if(target_element.classList.contains("newtodobutton") && todoInput.value) savetodo(todoInput.value);
    if(target_element.classList.contains("erasebutton")) searchInput.value = null;

    // to-dos/done events
    if(target_element.classList.contains("finishtodo")) endtodo(parent_element, parent_element.querySelector("h3").innerText);
    if(target_element.classList.contains("removetodo-todo") || target_element.classList.contains("removetodo-done")) parent_element.remove();
    if(target_element.classList.contains("edittodo-todo")) edit_menu(parent_element);

    // edit menu events
    if(target_element.classList.contains("cancel-todo")) edit_menu(parent_element);
    if(target_element.classList.contains("submit-todo") && editInput) submit_edit(editInput.value);

    //filter target
    if(target_element.classList.contains("filterselect")) filter_for(filter.value);
    console.log(target_element);
})

searchInput.addEventListener("keydown", (e)=>{
    if(e.keyCode>31 && e.keyCode<127) search(searchInput.value+e.key);
    else if(e.keyCode==8 && searchInput.value.length-1>0) search(searchInput.value.substring(0, searchInput.value.length-1));
    else if(e.keyCode==8 && searchInput.value.length-1<=0) search("");
    else search(searchInput.value);
})
