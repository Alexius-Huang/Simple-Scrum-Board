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

  boardEditingId?: number;
  cacheBoardName?: string;

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

  createTask(): void {
    console.log('Create item');
  }

  editBoard(boardId: number): void {
    this.boardEditingId = boardId;
    this.cacheBoardName = this.boards.find(({ id }) => id === boardId).name;
  }

  updateBoardName(params: { id: number, name: string }): void {
    const index: number = this.boards.findIndex(({ id }) => id === params.id);
    const board: Board = this.boards[index];
    const newBoard: Board = { ...board, name: params.name };
    this.boardService.updateBoard(params.id, newBoard)
      .subscribe(board => {
        const newBoards: Board[] = Array.from(this.boards);
        newBoards[index] = board;
        this.boards = newBoards;
        this.cacheBoardName = null;
        this.boardEditingId = null;
      });
  }

  removeBoard(boardId: number): void {
    console.log('remove item');
  }
}
