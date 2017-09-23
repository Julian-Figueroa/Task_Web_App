import { Task } from './models/task';
import { TasksService } from './services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'Tasks Tracker App';
  public subtitle = 'Pending / Overdue';

  public tasks: Task[];
  pending: Task[] = [];
  overDue: Task[] = [];
  public task;
  public errorMessage;
  form: FormGroup;

  constructor(private _taskService: TasksService,
    private fb: FormBuilder) {

    this.form = this.fb.group({
      title: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required]
    });

  }

  ngOnInit() {
    this.task = new Task('', '', '', 0, null, '', '', null, null);
    this.getAllTasks();
  }

  getAllTasks() {
    this._taskService.getTasks().subscribe(
      response => {
        this.tasks = response.task;

        const d1 = new Date();
        this.pending = this.tasks.filter(function (el) {
          const dDate = new Date(el.dueDate);
          return (dDate.getTime() >= d1.getTime());
        });

        this.overDue = this.tasks.filter(function (el) {
          const dDate = new Date(el.dueDate);
          return (dDate.getTime() <= d1.getTime());
        });

      }
    );
  }

  add() {
    const user = '59c2f72abce4978a73af061a';
    const taskStatus = '1';
    const val = this.form.value;
    this.task.title = val.title;
    this.task.dueDate = val.dueDate;
    this.task.priority = val.priority;
    this.task.owner = user;
    this.task.creator = user;
    this.task.taskStatus = taskStatus;

    this._taskService.createTask(this.task).subscribe(
      response => {
        const resp = response.task;
        alert('The Task was created');
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Requests Error');
        }
      });

    this.form.reset();
    this.getAllTasks();
  }

  delete(event, id) {
    this._taskService.deleteTasks(id).subscribe(
      response => {
        this.getAllTasks();
        alert('Task destroyed');
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Requests Error');
        }
      });
  }

  edit(event, id) {
    this._taskService.getTaskDetail(id).subscribe(
      response => {
        this.task = response.task;
      }
    );
  }

  modify(task) {
    this._taskService.updateTask(task).subscribe(
      response => {
        this.task = response.task;
        alert('The Task was updated');
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Requests Error');
        }
      });

    this.form.reset();
    this.getAllTasks();
  }
}
