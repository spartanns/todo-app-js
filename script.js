document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskText = taskInput.value.trim();
  if (taskText === "") return;

  let li = document.createElement("li");
  li.innerHTML = `<span onclick="toggleTask(this)" class="delBtn">${taskText}</span> <button onclick="removeTask(this)">X</button>`;
  document.getElementById("taskList").appendChild(li);

  saveTasks();
  taskInput.value = "";
}

function removeTask(button) {
  button.parentElement.remove();
  saveTasks();
}

function toggleTask(span) {
  span.classList.toggle("completed");
  saveTasks();
}

function saveTasks() {
  let tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.innerText.slice(0, -2),
      completed: li.querySelector("span").classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let taskList = document.getElementById("taskList");
  tasks.forEach((task) => {
    let li = document.createElement("li");
    li.innerHTML = `<span onclick="toggleTask(this)" class="${task.completed ? "completed" : ""}>${task.text}</span> <button onclick="removeTask(this)">X</button>`;
    taskList.appendChild(li);
  });
}
