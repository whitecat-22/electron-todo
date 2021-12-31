// フォームに内容が入力されたらMainプロセスに通知する
const { ipcRenderer } = require('electron');
document.getElementById('todoForm').addEventListener('submit', evt => {
    // prevent default refresh functionality of forms
    evt.preventDefault();

    // get input on the form
    const input = evt.target[0];

    // send input.value to main proecss
    ipcRenderer.send('add-todo', input.value);

    // reset input
    input.value = '';
});
