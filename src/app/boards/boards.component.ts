import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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

  newTaskBoardId?: number;
  newTaskForm;
  newTaskFormErrors?: {
    title: object,
    description: object
  } = {
    title: {},
    description: {},
  };

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

  constructor(
    private boardService: BoardService,
    private formBuilder: FormBuilder,
  ) {}

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

  newTask(boardId: number): void {
    this.newTaskBoardId = boardId;
    this.newTaskForm = this.formBuilder.group({
      boardId,
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    });
  }

  onNewTaskSubmit(data) {
    const title = this.newTaskForm.get('title');
    const description = this.newTaskForm.get('description');

    this.newTaskFormErrors = {
      title: title.errors || {},
      description: description.errors || {},
    };

    if (this.newTaskForm.status !== 'INVALID') {
      this.boardService.createTask(data)
        .subscribe(task => {
          this.tasks = [...this.tasks, task];
          this.newTaskForm.reset();
          this.newTaskBoardId = null;
        });
    }
  }

  clearNewTaskForm() {
    this.newTaskForm.reset();
    this.newTaskBoardId = null;
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
