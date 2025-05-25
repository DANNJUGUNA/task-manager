"use strict";
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.id = User.nextId++;
    }
}
User.nextId = 1;
class Task {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.assignedTo = null;
        this.id = Task.nextId++;
    }
}
Task.nextId = 1;
class UserService {
    constructor() {
        this.users = [];
    }
    createUser(name, email) {
        const newUser = { id: User.nextId++, name, email };
        this.users.push(newUser);
        return newUser;
    }
    deleteUser(id) {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1)
            return false;
        this.users.splice(index, 1);
        return true;
    }
    getUser(id) {
        return this.users.find(u => u.id === id);
    }
    listUsers() {
        return this.users;
    }
}
class TaskService {
    constructor() {
        this.tasks = [];
    }
    createTask(title, description) {
        const task = new Task(title, description);
        this.tasks.push(task);
        return task;
    }
    listTasks() {
        return this.tasks;
    }
}
const userService = new UserService();
const taskService = new TaskService();
const userForm = document.getElementById("userForm");
const createUserbtn = document.getElementById("createUserbtn");
const userName = document.getElementById("name");
const userEmail = document.getElementById("email");
const userButton = document.getElementById("userbutton");
const taskButton = document.getElementById('taskbutton');
const listTable = document.getElementById("listtable");
const taskForm = document.getElementById("taskForm");
const createTaskbtn = document.getElementById("createTaskbtn");
const taskTitle = document.getElementById("title");
const taskDescription = document.getElementById("description");
userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = userName.value;
    const email = userEmail.value;
    userService.createUser(name, email);
    userEmail.value = '';
    userName.value = '';
    const users = userService.listUsers();
    listTable.innerHTML = `
  <table id="tab">
        <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>DELETE</th>
            </tr>
        </thead>
        <tbody>
          ${users.map(user => `
            <tr>
              <td>${user.id}</td>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td><button id="deleteUser">Delete User</button></td>
            </tr>
      `).join('')}
        </tbody>
    </table>
  `;
});
userButton.addEventListener("click", e => {
    e.preventDefault();
    const users = userService.listUsers();
    listTable.innerHTML = `
  <table id="tab">
        <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>DELETE</th>
            </tr>
        </thead>
        <tbody>
          ${users.map(user => `
            <tr>
              <td>${user.id}</td>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td><button id="deleteUser">Delete User</button></td>
            </tr>
      `).join('')}
        </tbody>
    </table>
  `;
});
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = taskTitle.value;
    const description = taskDescription.value;
    taskService.createTask(title, description);
    taskTitle.value = '';
    taskDescription.value = '';
    const tasks = taskService.listTasks();
    listTable.innerHTML = `
  <table id="tab">
        <thead>
            <tr>
                <th>ID</th>
                <th>TASK</th>
                <th>DESCRIPTION</th>
                <th>ASSIGN</th>
                <th>DELETE</th>
            </tr>
        </thead>
        <tbody>
          ${tasks.map(task => `
            <tr>
              <td>${task.id}</td>
              <td>${task.title}</td>
              <td>${task.description}</td>
              <td><button id="deletetask">Assign Task</button></td>
              <td><button id="deletetask">Delete Task</button></td>
            </tr>
      `).join('')}
        </tbody>
    </table>
  `;
});
taskButton.addEventListener('click', e => {
    e.preventDefault();
    const tasks = taskService.listTasks();
    listTable.innerHTML = `
  <table id="tab">
        <thead>
            <tr>
                <th>ID</th>
                <th>TASK</th>
                <th>DESCRIPTION</th>
                <th>ASSIGN</th>
                <th>DELETE</th>
            </tr>
        </thead>
        <tbody>
          ${tasks.map(task => `
            <tr>
              <td>${task.id}</td>
              <td>${task.title}</td>
              <td>${task.description}</td>
              <td><button id="deletetask">Assign Task</button></td>
              <td><button id="deletetask">Delete Task</button></td>
            </tr>
      `).join('')}
        </tbody>
    </table>
  `;
});
