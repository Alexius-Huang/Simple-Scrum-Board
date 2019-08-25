import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  constructor(private http: HttpClient) {}

  fetchBoards(): Observable<any> {
    return this.http.get('/api/boards');
  }

  fetchTasks(): Observable<any> {
    return this.http.get('/api/tasks');
  }
}
