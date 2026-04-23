let tasks = [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
  }
}

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    taskInput.focus();
    return;
  }

  const newTask = {
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  taskInput.value = "";
  taskInput.focus();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) {
      li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;
    span.addEventListener("click", () => toggleTask(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Löschen";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => deleteTask(index));

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

loadTasks();