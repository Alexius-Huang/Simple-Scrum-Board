import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from './boards/board.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  fetchBoards(): Observable<any> {
    return this.http.get('/api/boards');
  }

  fetchTasks(): Observable<any> {
    return this.http.get('/api/tasks');
  }

  updateBoard(id: number, board: Board) {
    return this.http.put<Board>(`/api/boards/${id}`, board, this.httpOptions);
  }
}
