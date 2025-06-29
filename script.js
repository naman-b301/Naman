let listsContainer = document.getElementById('lists');

function createList() {
  const listName = document.getElementById('new-list').value.trim();
  if (!listName) return alert("List name required.");

  const listDiv = document.createElement('div');
  listDiv.className = 'todo-list';

  listDiv.innerHTML = `
    <h2>${listName}</h2>
    <div class="tasks"></div>
    <input type="text" placeholder="New task..." class="task-input" />
    <input type="datetime-local" class="task-datetime" />
    <button onclick="addTask(this)">Add Task</button>
  `;

  listsContainer.appendChild(listDiv);
  document.getElementById('new-list').value = '';
}

function addTask(button) {
  const listDiv = button.parentElement;
  const input = listDiv.querySelector('.task-input');
  const datetimeInput = listDiv.querySelector('.task-datetime');
  const tasksContainer = listDiv.querySelector('.tasks');

  const taskText = input.value.trim();
  const taskTime = datetimeInput.value;

  if (!taskText) return alert("Task can't be empty");

  const taskDiv = document.createElement('div');
  taskDiv.className = 'task';

  taskDiv.innerHTML = `
    <input type="checkbox" onchange="toggleComplete(this)" />
    <span>${taskText}</span>
    ${taskTime ? `<small>(${new Date(taskTime).toLocaleString()})</small>` : ''}
    <button onclick="editTask(this)">Edit</button>
    <button onclick="deleteTask(this)">Delete</button>
  `;

  tasksContainer.appendChild(taskDiv);
  input.value = '';
  datetimeInput.value = '';
}

function toggleComplete(checkbox) {
  const task = checkbox.parentElement;
  task.classList.toggle('completed', checkbox.checked);
}

function editTask(button) {
  const taskDiv = button.parentElement;
  const span = taskDiv.querySelector('span');
  const currentText = span.textContent;
  const newText = prompt("Edit task:", currentText);
  if (newText !== null) span.textContent = newText;
}

function deleteTask(button) {
  const taskDiv = button.parentElement;
  taskDiv.remove();
}
