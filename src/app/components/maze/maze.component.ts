import { Component, OnInit } from '@angular/core';
import { MazeService } from '../../services/maze.service';
import { Maze } from '../../classes/maze';
import { Observable } from 'rxjs';
import { Block } from '../../classes/block';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Grid } from '../../classes/grid';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss']
})
export class MazeComponent implements OnInit {

  maze: Maze;
  mazeId: number;
  solution: Block[];

  constructor(
    private mazeService: MazeService,
    private messageService: MessageService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  createMaze(gridValues: Grid) {
    const dialogRef = this.dialog.open(SpinnerComponent);
    this.mazeService.createMaze(gridValues)
      .subscribe(
        maze => {
          this.maze = maze;
        },
        error => {
          this.openSnackBar(this.messageService.parseError(error));
          dialogRef.close();
        },
        () => {
          this.solution = null;
          dialogRef.close();
        });

    return false;
  }
  getMaze() {
    const dialogRef = this.dialog.open(SpinnerComponent);
    this.mazeService.getMaze()
      .subscribe(
        maze => {
          this.maze = maze;
        },
        error => {
          this.openSnackBar(this.messageService.parseError(error));
          dialogRef.close();
        },
        () => {
          this.solution = null;
          dialogRef.close();
        });

    return false;
  }

  solveMaze(selectedAlgorithm: string) {
    const dialogRef = this.dialog.open(SpinnerComponent);
    this.mazeService.solveMaze(selectedAlgorithm)
      .subscribe(data => {
        this.solution = data;
      },
        error => {
          this.openSnackBar(this.messageService.parseError(error));
          dialogRef.close();
        },
        () => {
          dialogRef.close();
        });
    return false;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'close');
  }
}
