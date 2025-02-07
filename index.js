const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

function addTaskToTheTaskList(tasks, taskId, text, priority) {
  tasks.push({ taskId: taskId, text: text, priority: priority });
  return tasks;
}

app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = req.query.priority;

  let result = addTaskToTheTaskList(tasks, taskId, text, priority);

  res.json(result);
});

function returnCurrentStateOfTasks(tasks) {
  return tasks;
}
app.get('/tasks', (req, res) => {
  let result = returnCurrentStateOfTasks(tasks);

  res.json({ tasks: result });
});

function sortByPriority(taskObj1, taskObj2) {
  return taskObj1.priority - taskObj2.priority;
}
app.get('/tasks/sort-by-priority', (req, res) => {
  let result = tasks.sort(sortByPriority);
  res.json({ tasks: result });
});

function editPriorityById(tasks, taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
    }
  }
  return tasks;
}

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = req.query.priority;

  let result = editPriorityById(tasks, taskId, priority);
  res.json({ tasks: result });
});

function editTextById(tasks, taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
    }
  }
  return tasks;
}

app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;

  let result = editTextById(tasks, taskId, text);
  res.json({ tasks: result });
});

function deleteTasksById(task, taskId) {
  return task.taskId != taskId;
}

app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let result = tasks.filter((task) => deleteTasksById(task, taskId));
  res.json({ tasks: result });
});

function filterByPriority(task, priority) {
  return task.priority === priority;
}

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let result = tasks.filter((task) => filterByPriority(task, priority));
  res.json({ tasks: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
