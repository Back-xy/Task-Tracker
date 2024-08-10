const fs = require('fs');
const filePath = './tasks.json';

function loadTasks() {
  if (!fs.existsSync(filePath)) {
    return { tasks: [], nextId: 1 };
  }
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function saveTasks(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function addTask(description) {
  const data = loadTasks();
  const newTask = {
    id: data.nextId,
    description,
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  data.tasks.push(newTask);
  data.nextId += 1;
  saveTasks(data);
  console.log('Task added:', newTask);
}

function updateTask(id, newDescription) {
  const data = loadTasks();
  const task = data.tasks.find((task) => task.id === id);
  if (task) {
    task.description = newDescription;
    task.updatedAt = new Date().toISOString();
    saveTasks(data);
    console.log('Task updated:', task);
  } else {
    console.log('Task not found');
  }
}

function changeStatus(id, newStatus) {
  const validStatuses = ['todo', 'in-progress', 'done'];
  if (!validStatuses.includes(newStatus)) {
    console.log('Invalid status. Valid statuses are: todo, in-progress, done.');
    return;
  }

  const data = loadTasks();
  const task = data.tasks.find((task) => task.id == id);
  if (task) {
    task.status = newStatus;
    task.updatedAt = new Date().toISOString();
    saveTasks(data);
    console.log(`Task marked as ${newStatus}`);
  } else {
    console.log('Task not found');
  }
}

function deleteTask(id) {
  const data = loadTasks();
  const taskIndex = data.tasks.findIndex((task) => task.id == id);

  if (taskIndex === -1) {
    console.log('Task not found.');
    return;
  }

  data.tasks.splice(taskIndex, 1);
  saveTasks(data);
  console.log(`Task with ID "${id}" deleted.`);
}

function listTasks(status) {
  const data = loadTasks();
  const validStatuses = ['todo', 'in-progress', 'done'];

  if (status && !validStatuses.includes(status)) {
    console.log('Invalid status. Valid statuses are: todo, in-progress, done.');
    return;
  }

  const tasksToDisplay = status
    ? data.tasks.filter((task) => task.status === status)
    : data.tasks;

  if (tasksToDisplay.length === 0) {
    console.log(`No tasks found with status "${status || 'all'}".`);
  } else {
    console.log(`Tasks${status ? ' with status "' + status + '"' : ''}:`);
    console.log(tasksToDisplay);
  }
}

////// COMMAND LINE INTERFACE ////

const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  console.log('Please specify a command.');
  console.log('Usage: node task-tracker.js <command> [options]');
  console.log(
    'Commands: list, add, update, delete, mark-in-progress, mark-done'
  );
  process.exit(1);
}

switch (command) {
  case 'list':
    const status = args[1];
    listTasks(status);
    break;
  case 'add':
    const addDescription = args[1];
    if (!addDescription) {
      console.log('Please provide a description for the task.');
      process.exit(1);
    }
    addTask(addDescription);
    break;
  case 'update':
    const updateId = Number(args[1]);
    const newDescription = args[2];
    if (!updateId || !newDescription) {
      console.log('Please provide the task ID and new description.');
      process.exit(1);
    }
    updateTask(updateId, newDescription);
    break;
  case 'delete':
    const deleteId = Number(args[1]);
    if (!deleteId) {
      console.log('Please provide the task ID to delete.');
      process.exit(1);
    }
    deleteTask(deleteId);
    break;
  case 'mark-in-progress':
    const inProgressId = Number(args[1]);
    if (!inProgressId) {
      console.log('Please provide the task ID.');
      process.exit(1);
    }
    changeStatus(inProgressId, 'in-progress');
    break;
  case 'mark-done':
    const doneId = Number(args[1]);
    if (!doneId) {
      console.log('Please provide the task ID.');
      process.exit(1);
    }
    changeStatus(doneId, 'done');
    break;
  default:
    console.log(
      'Unknown command. Use list, add, delete, update, mark-in-progress, or mark-done.'
    );
    process.exit(1);
}
