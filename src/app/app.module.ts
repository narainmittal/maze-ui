import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { MazeOptionsComponent } from './components/maze-options/maze-options.component';
import { MazeDisplayComponent } from './components/maze-display/maze-display.component';

@NgModule({
  declarations: [
    AppComponent,
    MazeOptionsComponent,
    MazeDisplayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
