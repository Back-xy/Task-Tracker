# Task Tracker CLI Application

This is a simple command-line interface (CLI) application from https://roadmap.sh/projects/task-tracker for tracking and managing tasks. You can add, update, delete, and list tasks, as well as mark them as "in-progress" or "done". Tasks are stored in a JSON file in the current directory.

## Features

- **Add a Task**: Create a new task with a description.
- **Update a Task**: Update the description of an existing task.
- **Delete a Task**: Remove a task by its ID.
- **List Tasks**: Display all tasks, or filter tasks by status.
- **Mark Task as In-Progress**: Set the status of a task to "in-progress".
- **Mark Task as Done**: Set the status of a task to "done".

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Ensure you have Node.js installed.

## Usage

- **To add a new task**: `node tasks add "Your task description"`
- **To update an existing task's description**: `node tasks update <task-id> "New task description"`
- **To mark a task as "in-progress"**: `node tasks mark-in-progress <task-id>`
- **To mark a task as "done"**: `node tasks mark-done <task-id>`
- **To delete a task by its ID**: `node tasks delete <task-id>`
- **To list all tasks**: `node tasks list`
- **To list tasks by status**: `node tasks list <status>`
