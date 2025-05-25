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





