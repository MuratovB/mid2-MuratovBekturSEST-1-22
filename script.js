const userInput = document.getElementById('userInput');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const taskList = document.getElementById('taskList');
const emptyTaskListText = document.getElementById('emptyTaskListText');
const tasks = [];

function loadTasks() {
    let i = 0;
    while (localStorage.getItem(`task${i}`) !== null) {
        tasks.push(localStorage.getItem(`task${i}`));
        i++;
    }
    tasks.forEach(taskText => addTaskToDOM(taskText));
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
    });

    li.querySelector('.delete-btn').addEventListener('click', () => {
        const taskIndex = Array.from(taskList.children).indexOf(li);
        li.remove();
        removeFromLocalStorage(taskIndex);
        if (!Array.from(taskList.children).length) {
            emptyTaskListText.style.display = 'block';
        };
    });

    emptyTaskListText.style.display = taskList.children.length ? 'none' : 'block';
}

function removeFromLocalStorage(index) {
    localStorage.removeItem(`task${index}`);
    
    let i = index + 1;
    while (localStorage.getItem(`task${i}`) !== null) {
        localStorage.setItem(`task${i - 1}`, localStorage.getItem(`task${i}`));
        localStorage.removeItem(`task${i}`);
        i++;
    }
}

addBtn.addEventListener('click', () => {
    const taskText = userInput.value.trim();
    if (taskText) {
        const index = Array.from(taskList.children).length;
        localStorage.setItem(`task${index}`, taskText);
        console.log(localStorage.getItem('task0'));
        addTaskToDOM(taskText);
        console.log(localStorage.getItem('task0'));
        //updateLocalStorage();
        console.log(localStorage.getItem('task0'));
        userInput.value = '';
    }
});

clearBtn.addEventListener('click', () => {
    taskList.innerHTML = '';
    localStorage.clear();
    emptyTaskListText.style.display = 'block';
});

loadTasks();