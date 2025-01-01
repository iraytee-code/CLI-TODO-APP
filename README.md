# Command-line Todo App
Sample solution for the [task-tracker](https://roadmap.sh/projects/task-tracker) challenge from [roadmap.sh](https://roadmap.sh/).
### Description

- A Node.js command-line application for managing tasks with status tracking and filtering.

#### Features

- Create tasks with auto-generated IDs
- List all tasks or filter by status
- View detailed information for specific tasks
- Update task names and status
- Delete tasks by name
- Storage using JSON

## Prerequisites

- Node.js installed on your system.

## Installation

**Clone the Repository**

   ```bash
   git clone --depth=1 https://github.com/iraytee-code/CLI-TODO-APP.git

   # Navigate to the project Directory
   cd CLI-TODO-APP
```


```
 node todo.js <command> <taskname> [additional args]
```

### Available Commands

```
add <taskname> - Create a new task

list [--status] - List all tasks or filter by status (--pending, --done, --in-progress)

task-details <taskname> - Show details of a specific task

update <old-taskname> <new-taskname> - Update task name

status <taskname> <new-status> - Update task status (pending, in-progress, completed)

delete <taskname> - Delete a task by name

```

### Examples

```
# Add a new task
node todo.js add "Complete project documentation"

# List all tasks
node todo.js list

# List pending tasks
node todo.js list --pending

# List tasks in-progress
node todo.js list --in-progress

# List tasks completed
node todo.js list --completed

# Update task status
node todo.js status "Complete project documentation" in-progress

# Delete task
node todo.js delete "Complete project documentation"

```

### Data Storage

```
{
  "id": "abc1-def2",
  "task": "Task name",
  "status": "pending",
  "dateCreated": "2024-01-01T00:00:00.000Z",
  "dateUpdated":  "2024-01-01T00:00:00.000Z",
}

```
