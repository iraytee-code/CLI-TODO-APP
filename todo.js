const fs = require("fs");

const [, , command, input, newInput] = process.argv;

const validCommands = {
  add: "Add a new task",
  list: "List all tasks",
  "task-details": "Show details of a specific task",
  update: "Update a task name",
  status: "Update task status",
  delete: "Delete a task",
  filter: "Filter by a specific status",
};

if (!command || !validCommands[command]) {
  const closestCommand = Object.keys(validCommands).find(
    (cmd) => cmd.startsWith(command) || command?.startsWith(cmd)
  );

  console.log(`Error: '${command}' is not a valid command.`);
  console.log("\nAvailable commands:");
  Object.entries(validCommands).forEach(([cmd, desc]) => {
    console.log(`  ${cmd.padEnd(12)} - ${desc}`);
  });

  if (closestCommand) {
    console.log(`\nDid you mean '${closestCommand}'?`);
  }

  console.log("\nUsage: node todo.js <command> <taskname> [additional args]");
  return;
}

function checkFile() {
  if (!fs.existsSync("todo.json")) {
    fs.writeFileSync("todo.json", JSON.stringify([]));
  }
}

const todo = JSON.parse(fs.readFileSync("todo.json"));

function saveTodo(todoItems) {
  fs.writeFileSync("todo.json", JSON.stringify(todoItems));
}

function generateTodoId() {
  const characters = "abcdefghijklmnopqrstuvwxyz1234567890";
  let result = "";
  for (let i = 0; i < 4; i++) {
    result =
      result + characters.charAt(Math.floor(Math.random() * characters.length));
  }

  result = result + "-";

  for (let i = 0; i < 4; i++) {
    result =
      result + characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

// Add a todo
if (command === "add") {
  checkFile();
  const todoItem = {
    id: generateTodoId(),
    task: input,
    status: "pending",
    dateCreated: new Date().toISOString(),
    dateUpdated: null,
  };
  todo.push(todoItem);
  console.log("saving tasks....");
  saveTodo(todo);
  console.table(todo);
}

// List todos
if (command === "list") {
  if (input) {
    const validInputs = ["--pending", "--done", "--in-progress"];
    const isValidFlag = validInputs.some((flag) => input.includes(flag));

    if (isValidFlag) {
      const status = input.replace("--", "");
      console.log(`Filtering tasks with status: ${status}`);
      const filteredTasks = todo.filter((task) => task.status === status);
      if (filteredTasks.length > 0) {
        filteredTasks.forEach((item) => {
          console.table(item);
        });
      } else {
        console.log(`No tasks found with status: ${status}`);
      }
    } else {
      console.log(
        "Invalid flag. Use one of the following: --pending, --done, --in-progress."
      );
    }
  } else {
    console.log("retrieving tasks....");
    todo.forEach((item) => {
      console.table(item);
    });
  }
  return;
}

// List individual todo
if (command === "task-details" && input) {
  console.log("retrieving single task");
  const receivedTodo = input;
  const foundTask = todo.find((task) => task.task === receivedTodo);
  if (foundTask) {
    console.log(`message: Voila ${input} found!, Retrieving....`);
    console.table(foundTask);
  } else {
    console.log("task not found");
  }
}

// Update a task name
if (command === "update" && input && newInput) {
  const currentTaskname = input;
  const updateTaskname = newInput;
  let taskUpdated = false;
  for (let i = 0; i < todo.length; i++) {
    if (currentTaskname === todo[i].task) {
      todo[i].task = updateTaskname;
      taskUpdated = true;
      break;
    }
  }
  if (taskUpdated) {
    saveTodo(todo);
    console.log("Task updated successfully!");
  } else {
    console.log("Task not found!");
  }
}

// Update task status
if (command === "status" && input) {
  const currentTaskname = input;
  const updatedProgress = newInput;
  const validStatuses = ["in-progress", "completed", "pending"];
  if (!validStatuses.includes(updatedProgress)) {
    console.log(`Error: '${updatedProgress}' is not a valid status.`);
    console.log(`Valid statuses are: ${validStatuses.join(", ")}`);
    console.log(`Example usage: node todo.js status <taskname> completed`);
    return;
  }

  let progressUpdated = false;

  for (let i = 0; i < todo.length; i++) {
    if (currentTaskname === todo[i].task) {
      if (todo[i].status !== updatedProgress) {
        console.log("Updating Progress, Please wait...");
        todo[i].status = updatedProgress;
        todo[i].dateUpdated = new Date().toISOString();
        progressUpdated = true;
        break;
      } else {
        console.log("Status cannot be the same as the current status");
        progressUpdated = false;
        break;
      }
    }
  }

  if (progressUpdated) {
    saveTodo(todo);
    console.log("Status updated successfully!");
    console.table(todo);
  } else {
    console.log("Operation failed or task not found");
  }
}

// Delete a todo
if (command === "delete") {
  const receivedId = input;

  const taskToDelete = todo.find((task) => task.id === receivedId);

  if (taskToDelete) {
    const newTodo = todo.filter((item) => item.id !== receivedId);
    console.log("Task deleted");
    saveTodo(newTodo);
    console.table(newTodo);
  } else {
    console.log("Task not found with the given ID");
  }
}
