const path = require('path');
const { app, ipcMain } = require('electron');

const Window = require('./Window');
const Datastore = require('./DataStore');

// ホットリロード機能を有効化
require('electron-reload')(__dirname);

// create a new todo store name "Todos Main"
const todosData = new Datastore({ name: 'Todos Main' });

app.on('ready', () => {
    let mainWindow = new Window({
        file: path.join('renderer', 'index.html'),
    });

    // add todo window
    let addTodoWin;

    // initialize with todos
    mainWindow.once('show', () => {
        mainWindow.webContents.send('todos', todosData.todos);
    });

    // create add todo window
    ipcMain.on('add-todo-window', () => {
        if (!addTodoWin) {
            addTodoWin = new Window({
                file: path.join('renderer', 'add.html'),
                width: 400,
                height: 400,
                parent: mainWindow,
            });

            addTodoWin.on('closed', () => {
                addTodoWin = null;
            });
        }
    });
    ipcMain.on('add-todo', (event, todo) => {
        const updatedTodos = todosData.addTodo(todo).todos;
        mainWindow.send('todos', updatedTodos);
    });

    ipcMain.on('delete-todo', (event, todo) => {
        const updatedTodos = todosData.deleteTodo(todo).todos;
        mainWindow.send('todos', updatedTodos);
    });
});

app.on('window-all-closed', () => {
    app.quit();
});
