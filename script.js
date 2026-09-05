const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const categoryInput = document.getElementById("categoryInput");
const priorityInput = document.getElementById("priorityInput");
const dateInput = document.getElementById("dateInput");

const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

const searchInput = document.getElementById("searchInput");
const filterInput = document.getElementById("filterInput");

const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

const darkModeBtn = document.getElementById("darkModeBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function showTasks() {
    taskList.innerHTML = "";

    for (let task of tasks) {
        let li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        let name = document.createElement("span");
        name.className = "task-name";
        name.textContent = task.text;

        let category = document.createElement("span");
        category.className = "task-info";
        category.textContent = "📚 " + task.category;

        let priority = document.createElement("span");
        priority.className = "task-info";
        priority.textContent = "🔴 " + task.priority;

        let date = document.createElement("span");
        date.className = "task-info";
        date.textContent = "📅 " + (task.date || "No date");

        let completeBtn = document.createElement("button");
        completeBtn.className = "task-btn complete-btn";
        completeBtn.textContent = task.completed
            ? "↩️ Uncomplete"
            : "✅ Complete";

        completeBtn.addEventListener("click", function () {
            task.completed = !task.completed;

            saveTasks();
            showTasks();
            updateStats();
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.className = "task-btn delete-btn";
        deleteBtn.textContent = "🗑️ Delete";

        deleteBtn.addEventListener("click", function () {
            tasks = tasks.filter(function (item) {
                return item.id !== task.id;
            });

            saveTasks();
            showTasks();
            updateStats();
        });

        li.appendChild(name);
        li.appendChild(category);
        li.appendChild(priority);
        li.appendChild(date);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    }

    filterTasks();
}


taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    let newTask = {
        id: Date.now(),
        text: text,
        category: categoryInput.value,
        priority: priorityInput.value,
        date: dateInput.value,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    taskForm.reset();

    showTasks();
    updateStats();

    taskInput.focus();
});


function filterTasks() {
    let searchText = searchInput.value.toLowerCase();
    let selectedFilter = filterInput.value;

    let taskItems = taskList.children;

    for (let i = 0; i < taskItems.length; i++) {

        let task = tasks[i];
        let show = true;

        if (!task.text.toLowerCase().includes(searchText)) {
            show = false;
        }

        if (selectedFilter === "pending" && task.completed) {
            show = false;
        }

        if (selectedFilter === "completed" && !task.completed) {
            show = false;
        }

        if (selectedFilter === "high" && task.priority !== "High") {
            show = false;
        }

        if (selectedFilter === "study" && task.category !== "Study") {
            show = false;
        }

        if (selectedFilter === "work" && task.category !== "Work") {
            show = false;
        }

        if (selectedFilter === "personal" && task.category !== "Personal") {
            show = false;
        }

        taskItems[i].style.display = show ? "flex" : "none";
    }
}


searchInput.addEventListener("input", filterTasks);
filterInput.addEventListener("change", filterTasks);


function updateStats() {
    let completed = 0;

    for (let task of tasks) {
        if (task.completed) {
            completed++;
        }
    }

    let pending = tasks.length - completed;

    totalTasks.textContent = tasks.length;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;

    if (tasks.length === 0) {
        emptyMessage.classList.remove("hidden");
    } else {
        emptyMessage.classList.add("hidden");
    }
}


let darkMode = localStorage.getItem("darkMode");

if (darkMode === "true") {
    document.body.classList.add("dark-mode");
    darkModeBtn.textContent = "☀️";
}


darkModeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    let isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem("darkMode", isDark);

    if (isDark) {
        darkModeBtn.textContent = "☀️";
    } else {
        darkModeBtn.textContent = "🌙";
    }
});


showTasks();
updateStats();