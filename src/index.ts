interface IUser {
  id: number;
  name: string;
  email: string;
}
interface ITask {
  id: number;
  title: string;
  description: string;
  assignedTo: number | null;
}
class User implements IUser {
  static nextId = 1;
  public id: number;
  constructor(public name: string, public email: string) {
    this.id = User.nextId++;
  }
}
class Task implements ITask {
  static nextId = 1;
  public id: number;
  public assignedTo: number | null = null;
  constructor(public title: string, public description: string) {
    this.id = Task.nextId++;
  }
}

class UserService {
  public users: User[] = [];

  createUser(name: string, email: string): User {
        const newUser: User = {id:User.nextId++, name, email};
        this.users.push(newUser);
        return newUser;
    }
  deleteUser(id: number): boolean {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
  getUser(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }
  listUsers(): User[] {
    return this.users;
  }
}

class TaskService {
  public tasks: Task[] = [];

  createTask(title: string, description: string): Task {
    const task = new Task(title, description);
    this.tasks.push(task);
    return task;
  }

  listTasks(): Task[] {
    return this.tasks;
  }
}

const userService = new UserService();
const taskService = new TaskService();
const userForm = document.getElementById("userForm") as HTMLFormElement;
const createUserbtn=document.getElementById("createUserbtn") as HTMLButtonElement;
const userName=document.getElementById("name") as HTMLInputElement;
const userEmail=document.getElementById("email") as HTMLInputElement;
const userButton= document.getElementById("userbutton") as HTMLButtonElement;
const listTable = document.getElementById("listtable") as HTMLBodyElement;
const taskForm = document.getElementById("taskForm") as HTMLFormElement;
const createTaskbtn=document.getElementById("createTaskbtn") as HTMLButtonElement;
const taskTitle=document.getElementById("title") as HTMLInputElement;
const taskDescription=document.getElementById("description") as HTMLInputElement;
userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = userName.value;
    const email = userEmail.value;
    userService.createUser(name,email);
    userEmail.value='';
    userName.value='';
  const users= userService.listUsers();
  listTable.innerHTML=`
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
  `
  })

userButton.addEventListener("click", e=>{
  e.preventDefault();
  const users= userService.listUsers();
  listTable.innerHTML=`
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
  `
})


