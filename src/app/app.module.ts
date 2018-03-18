import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';


import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { MazeOptionsComponent } from './components/maze-options/maze-options.component';
import { MazeDisplayComponent } from './components/maze-display/maze-display.component';
import { MazeComponent } from './components/maze/maze.component';
import { MazeService } from './services/maze.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', component: MazeComponent },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    MazeOptionsComponent,
    MazeDisplayComponent,
    MazeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [MazeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
