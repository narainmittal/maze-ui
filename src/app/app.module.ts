import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { MazeOptionsComponent } from './components/maze-options/maze-options.component';
import { MazeDisplayComponent } from './components/maze-display/maze-display.component';
import { MazeComponent } from './components/maze/maze.component';
import { MazeService } from './services/maze.service';

@NgModule({
  declarations: [
    AppComponent,
    MazeOptionsComponent,
    MazeDisplayComponent,
    MazeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [MazeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
