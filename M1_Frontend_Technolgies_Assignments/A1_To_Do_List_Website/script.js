let taskInput = document.getElementById('taskInput');
let addTaskButton = document.getElementById('addTaskButton');
let taskList = document.getElementById('taskList');
let taskCount = document.getElementById('taskCount');

document.addEventListener('DOMContentLoaded', function () {
    let savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        taskList.innerHTML = savedTasks;
        updateTaskCount();
    }
});

addTaskButton.addEventListener('click', function () {
    let taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    } else {
        alert('Please enter a task.');
    }
});

function addTask(taskText) {
    let li = document.createElement('li');
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="edit-btn" onclick="editTask(this)">Edit</button>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
        <button class="complete-btn" onclick="markTask(this)">Mark as Done</button>
    `;
    taskList.appendChild(li);
    saveTasks();
    updateTaskCount();
}

function markTask(button) {
    let li = button.parentElement;
    li.classList.toggle('completed');
    saveTasks();
    updateTaskCount();
}

function deleteTask(button) {
    let li = button.parentElement;
    taskList.removeChild(li);
    saveTasks();
    updateTaskCount();
}

function editTask(button) {
    let li = button.parentElement;
    let taskText = li.querySelector('.task-text');
    let newTaskText = prompt("Edit your task:", taskText.textContent);
    if (newTaskText !== null && newTaskText.trim() !== "") {
        taskText.textContent = newTaskText.trim();
        saveTasks();
    }
}

function saveTasks() {
    localStorage.setItem('tasks', taskList.innerHTML);
}

function updateTaskCount() {
    let totalTasks = taskList.querySelectorAll('li').length;
    let completedTasks = taskList.querySelectorAll('li.completed').length;
    let pendingTasks = totalTasks - completedTasks;
    taskCount.textContent = `${pendingTasks} task(s) pending`;
}
