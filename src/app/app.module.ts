import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardsComponent } from './boards/boards.component';
import { BoardTitleComponent } from './board-title/board-title.component';
import { BoardNewTaskFormComponent } from './board-new-task-form/board-new-task-form.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardsComponent,
    BoardTitleComponent,
    BoardNewTaskFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
