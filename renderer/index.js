const { ipcRenderer } = require('electron');

// create add todo window button
document.getElementById('createTodoBtn').addEventListener('click', () => {
    ipcRenderer.send('add-todo-window');
});

// delete todo by its text value
const deleteTodo = e => {
    ipcRenderer.send('delete-todo', e.target.textContent);
};

// on receive todos
ipcRenderer.on('todos', (event, todos) => {
    // get todoList
    const todoList = document.getElementById('todoList');
    // create html string
    const todoItems = todos.reduce((html, todo) => {
        html += `<li class="todo-item">${todo}</li>`;

        return html;
    }, '');

    // set list html to the todo items
    todoList.innerHTML = todoItems;

    // add click handlers to delete the clicked todo
    todoList.querySelectorAll('.todo-item').forEach(item => {
        item.addEventListener('click', deleteTodo);
    });
});
