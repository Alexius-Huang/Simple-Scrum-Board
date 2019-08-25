# Simple Scrum Board

My first Angular App practice project.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.0.

Clone the project and then:

```
# Enter the project
$ cd simple-scrum-board

# Open development server
$ ng serve
```

Open another terminal and navigate to the project directory, and then open the [json-server](https://github.com/typicode/json-server):

```
$ json-server --watch db.json
```

Open your browser and navigate to `localhost:4200/`, there you go!

## Memo & Angular Feature Practices

- First time using TypeScript to develop an App
- Template rendering with Angular directives including basic `*ngIf`, `*ngFor` ... etc
- Create a service and fetch/create/update/destroy data from server
- Using `ReactiveForm` to manage form validation and submission

## FAQ

Q: How do you achieve `computed` properties similar to VueJS?
A: Use the TypeScript getter methods (getter modifiers), for instance:

```typescript
export class BoardsComponent implements OnInit {
  boards: Board[] = [];
  tasks: Task[] = [];

  // Computed Property
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
}
```

Q: How to use Angular `if...else...` template?
A: Alternatives is to nest condition with `ng-template` and `ng-container`:

```html
<ng-container *ngIf="foo === 1; else second">The First!</ng-container>

<ng-template #second>
  <ng-container *ngIf="foo === 2; else third">Second!</ng-container>
</ng-template>

<ng-template #third>
  Third and last ...
</ng-template>
```

Q: How to place the image assets?
A: Put your asset files in `/src/assets` directory, then you can specify the target asset file source URL as `/assets/<YOUR_ASSET_FILE_LOCATION>`

Q: How to implement form submission feature in Angular?
A: First of all, the feature resides in `ReactiveFormsModule` in `@angular/forms` package, so we will import it in `app.module.ts` file:

```typescript
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: { ... },
  imports: [
    ...,
    ReactiveFormsModule,
  ],
  ...
});
```

Then you can use something called `FormBuilder` in `@angular/forms` to create a form in your component TypeScript file:

```typescript
// boards.component.ts

import { FormBuilder } from '@angular/forms';

export class BoardsComponent implements OnInit {
  newTaskForm; // Declare your form name

  constructor(
    private boardService: BoardService,
    private formBuilder: FormBuilder,
  )

  newTask(boardId: number): void {
    this.newTaskBoardId = boardId;
    this.newTaskForm = this.formBuilder.group({
      boardId,
      title: '',
      description: '',
    });
  }

  onNewTaskSubmit(data) {
    this.boardService.createTask(data)
      .subscribe(task => {
        this.tasks = [...this.tasks, task];
        this.clearNewTaskForm();
      });
    }
  }

  clearNewTaskForm() {
    this.newTaskForm.reset();
    this.newTaskBoardId = null;
  }
}
```

In your template file, use `formGroup` to specify the target form; to attach the submit event, use the `ngSubmit` event; in each form input field, you need to specify the name of the form controlled field with `formControlName` attribute:

```html
<!-- boards.component.html -->

<form
  class="new-task-form"
  [formGroup]="newTaskForm"
  (ngSubmit)="onNewTaskSubmit(newTaskForm.value)"
>
  <label>
    <p class="label-title">Title</p>
    <input type="text" required formControlName="title" placeholder="Task Title" />
  </label>

  <label>
    <p class="label-title">Description</p>
    <input type="text" required formControlName="description" placeholder="Task Description" />
  </label>

  <div class="btn-group">
    <button type="submit">
      <img src="assets/icons/done.svg" />
    </button>
    <button (click)="clearNewTaskForm()">
      <img src="assets/icons/clear.svg" />
    </button>      
  </div>
</form>
```