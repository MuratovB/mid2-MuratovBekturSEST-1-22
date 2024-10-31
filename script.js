const userInput = document.getElementById('userInput');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const taskList = document.getElementById('taskList');
const emptyTaskListText = document.getElementById('emptyTaskListText');
let tasks = [];

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = savedTasks;
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

function addTaskToDOM(taskText, completed = false) {
    const li = document.createElement('li');
    li.className = `task-item${completed ? ' completed' : ''}`;

    li.innerHTML = `
        <span>${taskText}</span>
        <div>
            <button class="complete-btn">✔️</button>
            <button class="delete-btn">❌</button>
        </div>
    `;

    taskList.appendChild(li);

    li.querySelector('.complete-btn').addEventListener('click', () => {
        li.classList.toggle('completed');
        const taskIndex = Array.from(taskList.children).indexOf(li);
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        updateLocalStorage();
    });

    li.querySelector('.delete-btn').addEventListener('click', () => {
        const taskIndex = Array.from(taskList.children).indexOf(li);
        li.remove();
        tasks.splice(taskIndex, 1);
        updateLocalStorage();
        if (!Array.from(taskList.children).length) {
            emptyTaskListText.style.display = 'block';
        };
    });

    emptyTaskListText.style.display = taskList.children.length ? 'none' : 'block';
}

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

addBtn.addEventListener('click', () => {
    const taskText = userInput.value.trim();
    if (taskText) {
        const newTask = { text: taskText, completed: false };
        tasks.push(newTask);
        addTaskToDOM(taskText);
        updateLocalStorage();
        userInput.value = '';
    }
});

clearBtn.addEventListener('click', () => {
    taskList.innerHTML = '';
    tasks = [];
    localStorage.removeItem('tasks');
    emptyTaskListText.style.display = 'block';
});

loadTasks();