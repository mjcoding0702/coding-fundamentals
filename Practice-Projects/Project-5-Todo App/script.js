//DOM elements
const taskInput = document.querySelector("#task-input");
const addTaskButton = document.querySelector(".add-task-btn");
const filterAll = document.querySelector("#filter-all")
const filterPriority = document.querySelector("#filter-priority")
const filterNonPriority = document.querySelector("#filter-non-priority")
const filterCompleted = document.querySelector("#filter-completed")
const taskList = document.querySelector(".task-list");
const filter = document.querySelector('.filter')

// Add Todo Function
function addTodo(todoItem){
    let todoItems = [];
    const storedTodoItems = localStorage.getItem('todoItems');
    if (storedTodoItems) {
        todoItems = JSON.parse(storedTodoItems)
    }
    // Add the new todo item to the array
    todoItems.push(todoItem)

    // Update local storage with the updated todo items array
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
    
    displayTodoItems()
}


function displayTodoItems() {
    let todoItems = [];
    const storedTodoItems = localStorage.getItem('todoItems');
    if (storedTodoItems) {
        todoItems = JSON.parse(storedTodoItems)
        taskList.innerHTML = '';
        todoItems.forEach(todoItem =>{
            const taskItem = `
            <div class="task-item ${todoItem.isPrioritized ? 'prioritized' : ''} ${todoItem.isCompleted ? 'completed' : ''}" data-id="${todoItem.id}">
                <div class="task-content">
                    <input type="checkbox" ${todoItem.isCompleted ? 'checked' : ''}>
                    <p>${todoItem.item}</p>
                </div>
                <div class="task-button" >
                    <button class="prioritize-btn btn">Prioritize</button>
                    <button class="delete-btn btn" >Delete</button>
                </div>
            </div>
            `
            taskList.innerHTML += taskItem;
        })
        
    } 
    return
}
// Call add todo button
addTaskButton.addEventListener('click', (e) => {
    e.preventDefault();
    const newTodoItem = {
        id: new Date().getTime(),
        item: taskInput.value,
        isPrioritized: false,
        isCompleted: false
    }
    if (newTodoItem.item.length === 0){
        alert("Please write something to add task")
        return
    } 
    addTodo(newTodoItem);
    taskInput.value = '';
    
});

// Delete a todo item
taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')){
        const id = parseInt(e.target.closest('.task-item').dataset.id); //ID of the current delete button clicked. Need to parse from string to an integer
        const todoItems = getTodoItems()

        //Find the index of the item with the given ID
        const index = todoItems.findIndex(item => item.id === id);

        // remove the item from the array
        todoItems.splice(index,1);

        // update local storage with the modified array
        localStorage.setItem('todoItems', JSON.stringify(todoItems));

        // remove item from the DOM
        e.target.closest('.task-item').remove(); //Targets the parent of the selected delete button
    }
})


// Prioritize todo button
taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('prioritize-btn')){
        const id = parseInt(e.target.closest('.task-item').dataset.id); //ID of the current prioritized button clicked. Need to parse from string to an integer
        const todoItems = getTodoItems()

        //Find the index of the item with the given ID
        const index = todoItems.findIndex(item => item.id === id);

        // Toggle isPriotized property in the local storage 
        todoItems[index].isPrioritized = !todoItems[index].isPrioritized;

        // Update localstorage
        localStorage.setItem('todoItems', JSON.stringify(todoItems));

        // Update DOM 
        const parentRow = e.target.closest('.task-item');
        parentRow.classList.toggle('prioritized');
    }
})


// Complete todo button
taskList.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT'){
        const id = parseInt(e.target.closest('.task-item').dataset.id)
        const todoItems = getTodoItems()

        //Find the index of the item with the given ID
        const index = todoItems.findIndex(item => item.id === id);

        // Toggle isPriotized property in the local storage 
        todoItems[index].isCompleted = !todoItems[index].isCompleted;

        // Update localstorage
        localStorage.setItem('todoItems', JSON.stringify(todoItems));

        //Find the parent row element 
        const parentRow = e.target.closest('.task-item');
        parentRow.classList.toggle('completed');
    }
})





// Filter button 
filter.addEventListener('click', filterTaskItem)
function filterTaskItem(){
    const selectedStatus = document.querySelector('input[name="filter"]:checked').value
    const allTaskItems = document.querySelectorAll('.task-item');
    switch(selectedStatus) {
        case "all":
            allTaskItems.forEach(item => {
                item.style.display = 'flex';
            })
        break;

        case "prioritized":
            allTaskItems.forEach(item => {
                item.style.display = 'none';
                if (item.classList.contains('prioritized')){
                    item.style.display = 'flex';
                }
            })
        break;

        case "non-prioritized":
            allTaskItems.forEach(item => {
                item.style.display = 'flex';
                if (item.classList.contains('prioritized') || item.classList.contains('completed')){
                    item.style.display = 'none';
                }
            })
        break;

        case "completed":
            allTaskItems.forEach(item => {
                item.style.display = 'none';
                if (item.classList.contains('completed')){
                    item.style.display = 'flex';
                }
            })
        break;
    }
} 


// Window loads
window.addEventListener('load', () => {
    // Radio button "All" is selected by default
    const filterAllButton = document.querySelector('input[value="all"]');
    filterAllButton.checked = true;
    
    const currentTodoItems = localStorage.getItem('todoItems');
    if (currentTodoItems) {
        console.log(currentTodoItems)
    }
    displayTodoItems()
})


function getTodoItems() {
    let todoItems = [];
    const storedTodoItems = localStorage.getItem('todoItems');
    if (storedTodoItems) {
        todoItems = JSON.parse(storedTodoItems)
    }

    return todoItems
}