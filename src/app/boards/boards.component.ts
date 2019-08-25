import { Component, OnInit } from '@angular/core';
import { Board } from './board.model';
import { BoardService } from '../board.service';
import { Task } from './task.model';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.sass']
})
export class BoardsComponent implements OnInit {
  boards: Board[] = [];
  tasks: Task[] = [];

  get boardTaskMap(): Map<number, Task> {
    const { boards, tasks } = this;
    const mapping = boards.reduce((acc, board) =>
      acc.set(board.id, []),
      new Map(),
    );

    tasks.forEach(task => {
      mapping.get(task.boardId).push(task);
    });

    return mapping;
  }

  constructor(private boardService: BoardService) {}

  ngOnInit() {
    this.fetchBoards();
    this.fetchTasks();
  }

  fetchBoards(): void {
    this.boardService.fetchBoards()
      .subscribe(data => this.boards = data);
  }

  fetchTasks(): void {
    this.boardService.fetchTasks()
      .subscribe(data => this.tasks = data);
  }
}
