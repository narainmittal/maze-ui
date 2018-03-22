import { Component, OnInit } from '@angular/core';
import { MazeService } from '../../services/maze.service';
import { Maze } from '../../classes/maze';
import { Observable } from 'rxjs/Observable';
import { Block } from '../../classes/block';
import { MatDialog } from '@angular/material';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.css']
})
export class MazeComponent implements OnInit {

  maze: Maze;
  mazeId: number;
  solution: Block[];

  constructor(private mazeService: MazeService, private dialog: MatDialog) { }

  ngOnInit() {

  }

  getMaze() {
    const dialogRef = this.dialog.open(SpinnerComponent);
    this.mazeService.getMaze()
      .subscribe(maze => {
        this.maze = maze;
        dialogRef.close();
      });

    return false;
  }

  solveMaze(selectedAlgorithm: string) {
    const dialogRef = this.dialog.open(SpinnerComponent);
    this.mazeService.solveMaze(selectedAlgorithm)
      .subscribe(data => {
        this.solution = data;
        dialogRef.close();
      });
    return false;
  }
}
