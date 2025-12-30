let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
  const taskInput = document.getElementById("task");
  const priority = document.getElementById("priority").value;

  if (taskInput.value.trim() === "") return;

  tasks.push({
    text: taskInput.value,
    priority: priority,
    done: false
  });

  taskInput.value = "";
  saveAndRender();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveAndRender();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("list");
  const progressBar = document.getElementById("progressBar");

  list.innerHTML = "";
  let completed = 0;

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `${task.priority} ${task.done ? "done" : ""}`;

    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button onclick="deleteTask(${index})">Delete</button>
    `;

    list.appendChild(li);
    if (task.done) completed++;
  });

  const progress = tasks.length
    ? (completed / tasks.length) * 100
    : 0;

  progressBar.style.width = progress + "%";
}

renderTasks();
