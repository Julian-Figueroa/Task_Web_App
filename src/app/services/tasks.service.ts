import { URL_BACKEND } from './../config/url.backend';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TasksService {

  constructor(private http: Http) { }

  getTasks() {
    return this.http.get(URL_BACKEND).map(res => res.json());
  }

  getTaskDetail(id) {
    return this.http.get(URL_BACKEND + id).map(res => res.json());
  }

  deleteTasks(id) {
    return this.http.get(URL_BACKEND + 'destroy/' + id).map(res => res.json());
  }

  createTask(task) {
    const json = JSON.stringify(task);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const params = 'json=' + json;

    return this.http.post(URL_BACKEND + 'create/' + task.title + '/' + task.dueDate + '/' + task.priority, params, { headers: headers })
      .map(res => res.json());
  }

  updateTask(task) {
    const json = JSON.stringify(task);
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const params = 'json=' + json;


    return this.http.post(URL_BACKEND + 'update/' + task._id , params, { headers: headers })
      .map(res => res.json());
  }

}
