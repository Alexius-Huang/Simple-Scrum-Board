import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardNewTaskFormComponent } from './board-new-task-form.component';

describe('BoardNewTaskFormComponent', () => {
  let component: BoardNewTaskFormComponent;
  let fixture: ComponentFixture<BoardNewTaskFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardNewTaskFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardNewTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
