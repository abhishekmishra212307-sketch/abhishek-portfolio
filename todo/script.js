 let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function showTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        let li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">
                ${task.text}
            </span>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="completeTask(${index})">Complete</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;

        taskList.appendChild(li);
    });

    updateCounter();
}

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";

    showTasks();
}

function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    showTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    showTasks();
}
function editTask(index) {
    let newTask = prompt("Edit your task:", tasks[index].text);

    if (newTask === null) {
        return;
    }

    newTask = newTask.trim();

    if (newTask === "") {
        alert("Task cannot be empty!");
        return;
    }

    tasks[index].text = newTask;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    showTasks();
}

function updateCounter() {
    let total = tasks.length;

    let completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    let pending = total - completed;

    document.getElementById("totalTasks").innerText = total;
    document.getElementById("completedTasks").innerText = completed;
    document.getElementById("pendingTasks").innerText = pending;
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");

    let button = document.getElementById("themeBtn");

    if (document.body.classList.contains("dark-mode")) {
        button.innerText = "☀️ Light Mode";
    } else {
        button.innerText = "🌙 Dark Mode";
    }
}

function clearHistory() {
    // Not needed for To-Do List
}

showTasks();

document.getElementById("taskInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
function searchTasks() {
    let searchText = document.getElementById("searchInput").value.toLowerCase();
    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        if (task.text.toLowerCase().includes(searchText)) {
            let li = document.createElement("li");

            li.innerHTML = `
                <span class="${task.completed ? "completed" : ""}">
                    ${task.text}
                </span>

                <button onclick="completeTask(${index})">Complete</button>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            `;

            taskList.appendChild(li);
        }
    });
}
function filterTasks(type) {
    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        if (
            type === "all" ||
            (type === "pending" && !task.completed) ||
            (type === "completed" && task.completed)
        ) {
            let li = document.createElement("li");

            li.innerHTML = `
                <span class="${task.completed ? "completed" : ""}">
                    ${task.text}
                </span>

                <button onclick="completeTask(${index})">Complete</button>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            `;

            taskList.appendChild(li);
        }
    });
}
function clearAllTasks() {
    if (tasks.length === 0) {
        alert("No tasks to clear!");
        return;
    }

    let confirmClear = confirm("Are you sure you want to delete all tasks?");

    if (confirmClear) {
        tasks = [];

        localStorage.setItem("tasks", JSON.stringify(tasks));

        showTasks();
    }
}