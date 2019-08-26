import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChange,
} from '@angular/core';
import { Board } from '../boards/board.model';

@Component({
  selector: 'board-title',
  templateUrl: './board-title.component.html',
  styleUrls: ['./board-title.component.sass']
})
export class BoardTitleComponent implements OnChanges {
  @Input() editing: boolean;
  @Input() board: Board;
  editBoardName: string;

  @Output() onUpdateBoard = new EventEmitter<Board>();

  constructor() { }

  updateBoard(board: Board): void {
    this.onUpdateBoard.emit(board);
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
    const { editing } = changes;
    if (editing.previousValue !== editing.currentValue) {
      this.handleEditingStatusChange(editing);
    }
  }

  handleEditingStatusChange(params: SimpleChange) {
    const { previousValue: pre, currentValue: cur } = params;

    if (cur && cur !== pre) {
      this.editBoardName = this.board.name;
    }
  }
}
