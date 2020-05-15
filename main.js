//select the Elements
const container = document.querySelector('.container');
var inputValue = document.querySelector('.input');
const add = document.querySelector('.add');


//check if todos is not empty
if(window.localStorage.getItem("todos") == undefined){
    var todos = [];
     window.localStorage.setItem("todos", JSON.stringify(todos));
}else{
    todos = window.localStorage.getItem("todos");
    todos = JSON.parse(todos);
}

//clear localStoraage
clear.addEventListener("click",function(){
    localStorage.clear()
    location.reload()
})

//create item and add some functions,like 'edit' and 'del'
class item{
	constructor(name){ //name means valid inputValue.value  
        this.createItem(name);
	}
    createItem(name){
    	var itemBox = document.createElement('div');
        itemBox.classList.add('item');

    	var input = document.createElement('input');
    	input.type = "text";
    	input.disabled = true;
    	input.value = name;
    	input.classList.add('item_input');

    	var edit = document.createElement('button');
    	edit.classList.add('edit');
    	edit.innerHTML = "edit";
    	edit.addEventListener('click', () => this.edit(input, name));

    	var remove = document.createElement('button');
    	remove.classList.add('remove');
    	remove.innerHTML = "del";
    	remove.addEventListener('click', () => this.remove(itemBox, name));

    	container.appendChild(itemBox);

        itemBox.appendChild(input);
        itemBox.appendChild(edit);
        itemBox.appendChild(remove);

    }

    edit(input, name){
        if(input.disabled == true){
           input.disabled = !input.disabled;
        }
    	else{
            input.disabled = !input.disabled;
            let indexof = todos.indexOf(name);//indexof=0
            todos[indexof] = input.value;//[0:input.value,1:B,2:C,length:3]
            window.localStorage.setItem("todos", JSON.stringify(todos));
        }
    }

    remove(itemBox, name){
        itemBox.parentNode.removeChild(itemBox);
        let index = todos.indexOf(name);
        todos.splice(index, 1);
        window.localStorage.setItem("todos", JSON.stringify(todos));
    }
}

//listen to mouseEvent and keyboardEvent
add.addEventListener('click', check);
window.addEventListener('keydown', (e) => {
	if(e.which == 13){ 
		check();
	}
})

//check if inputValue.value is empty, decide if create a new todo item and update localStorage data
function check(){
	if(inputValue.value != ""){
		new item(inputValue.value);
        todos.push(inputValue.value);
        window.localStorage.setItem("todos", JSON.stringify(todos));
		inputValue.value = "";
	}
}

//load items to the user's interface
for (var v = 0 ; v < todos.length ; v++){
    new item(todos[v]);
}






