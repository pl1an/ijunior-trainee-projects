//getting elements
const form = document.querySelector(".form-place");
const end_form = document.querySelector(".activated-card");

const name_input = document.querySelector(".name-input");
const number_input = document.querySelector(".number-input");
const month_input = document.querySelector(".month-input");
const year_input = document.querySelector(".year-input");
const cvc_input = document.querySelector(".cvc-input");

const number_text = document.querySelector("#number");
const name_text = document.querySelector("#name");
const year_text = document.querySelector("#year");
const month_text = document.querySelector("#month");
const cvc_text = document.querySelector("#cvc");

//functions
function change_form(reset){
    form.classList.toggle("hide");
    end_form.classList.toggle("hide");

    if(reset){
        name_input.value = null;
        number_input.value = null;
        month_input.value = null;
        year_input.value = null;
        cvc_input.value = null;
    
        number_text.innerText = "0000 0000 0000 0000";
        name_text.innerText = "Jane Appleseed";
        year_text.innerText = "00";
        month_text.innerText = "00";
        cvc_text.innerText = "000";
    }
}

function toggle_error(target, empty_error, type_error){
    const target_parent = target.closest("div");

    if(empty_error && target_parent.querySelector(".blank").classList.contains("hide")){
        target_parent.querySelector(".blank").classList.remove("hide");
        //hsl(270, 3%, 87%)
    }
    if(type_error && target_parent.querySelector(".numbers-only").classList.contains("hide")){
        target_parent.querySelector(".numbers-only").classList.remove("hide");
        target.style.border = "1px red solid";
    }
    if(!empty_error && !target_parent.querySelector(".blank").classList.contains("hide")){
        target_parent.querySelector(".blank").classList.add("hide");
    }
    if(!type_error && !target_parent.querySelector(".numbers-only").classList.contains("hide")){
        target_parent.querySelector(".numbers-only").classList.add("hide");
    }

    if(type_error || empty_error) target.style.border = "1px red solid";
    if(!type_error && !empty_error) target.style.removeProperty("border");
}

function only_numbers(text){
    const accepted_char = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for(i of text){
        if(i in accepted_char || i==" ");
        else return false;
    }
    return true;
}

function writable(lettercode){
    switch (lettercode) {
        case 8:  // Backspace  
        case 9:  // Tab      
        case 13: // Enter
        case 16: // Shift
        case 17: // Ctrl
        case 18: // Alt
        case 19: // Pause/Break
        case 20: // Caps Lock
        case 27: // Escape
        case 35: // End
        case 36: // Home
        case 37: // Left
        case 38: // Up
        case 39: // Right
        case 40: // Down
        // Mac CMD Key
        case 91: // Safari, Chrome
        case 93: // Safari, Chrome
        case 224: // Firefox
            return false;

        default:
            return true;
    }
}

function keyboard_listener(e, target_input, text, default_text, maxchar, onlynumbers){
    if(onlynumbers){
        if((!only_numbers(target_input.value) || !only_numbers(e.key)) && writable(e.keyCode) && target_input.value) toggle_error(target_input, false, true);
        else toggle_error(target_input, false, false);
    }
    else toggle_error(target_input, false, false);

    if(target_input.value == " " || (target_input.value=="" && e.keyCode==32)){
        target_input.value = null;
        text.innerText = default_text;
        toggle_error(target_input, true, false);
    }
    else if(target_input.value.length==maxchar && writable(e.keyCode));
    else if(writable(e.keyCode)) text.innerText = target_input.value + e.key;
    else if(e.keyCode == 8 && target_input.value.substring(0, target_input.value.length-1)){
        text.innerText = target_input.value.substring(0, target_input.value.length-1);
        if(onlynumbers){
            if(!only_numbers(text.innerText)) toggle_error(target_input, false, true);
            else toggle_error(target_input, false, false);
        }
    }
    else if(e.keyCode == 8 && !target_input.value.substring(0, target_input.value.length-1)){
        text.innerText = default_text;
        toggle_error(target_input, true, false);
    }
}

//event handling
document.addEventListener("click", (e) =>{
    e.preventDefault();
    target = e.target;
    const can_submit = name_input.value && number_input.value && cvc_input.value && month_input.value && year_input.value && only_numbers(number_input.value) && only_numbers(cvc_input.value) && only_numbers(month_input.value) && only_numbers(year_input.value);
    if(target.classList.contains("submit") && can_submit) change_form(false);
    if(target.classList.contains("reset"))  change_form(true);
})

name_input.addEventListener("keydown", (e) =>{
    keyboard_listener(e, name_input, name_text, "Jane Appleseed", 28, false);
})
number_input.addEventListener("keydown", (e) =>{
    keyboard_listener(e, number_input, number_text, "0000 0000 0000 0000", 19, true);
})
cvc_input.addEventListener("keydown", (e) =>{
    keyboard_listener(e, cvc_input, cvc_text, "000", 3, true);
})
month_input.addEventListener("keydown", (e) =>{
    keyboard_listener(e, month_input, month_text, "00", 2, true);
})
year_input.addEventListener("keydown", (e) =>{
    keyboard_listener(e, year_input, year_text, "00", 2, true);
})