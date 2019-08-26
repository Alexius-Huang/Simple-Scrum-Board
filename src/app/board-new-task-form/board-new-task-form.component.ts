import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

type ErrorFormat = {
  title: object,
  description: object,
};

@Component({
  selector: 'board-new-task-form',
  templateUrl: './board-new-task-form.component.html',
  styleUrls: ['./board-new-task-form.component.sass']
})
export class BoardNewTaskFormComponent implements OnInit {
  newTaskForm;
  newTaskFormErrors?: ErrorFormat = {
    title: {},
    description: {},
  };

  @Input() boardId: number;
  @Output() onSubmit = new EventEmitter<FormGroup>();
  @Output() onClear = new EventEmitter<void>();
  @Output() onError = new EventEmitter<ErrorFormat>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initNewTaskForm();
  }

  initNewTaskForm(): void {
    this.newTaskForm = this.formBuilder.group({
      boardId: <number>this.boardId,
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    });
  }

  onNewTaskSubmit(form: FormGroup): void {
    const title = form.get('title');
    const description = form.get('description');

    this.newTaskFormErrors = <ErrorFormat>{
      title: title.errors || {},
      description: description.errors || {},
    };

    if (form.status !== 'INVALID') {
      this.onSubmit.emit(form);
    } else {
      console.log('error');
      this.onError.emit(<ErrorFormat>this.newTaskFormErrors);
    }
  }

  clearNewTaskForm() {
    this.newTaskForm.reset();
    this.onClear.emit();
  }
}
