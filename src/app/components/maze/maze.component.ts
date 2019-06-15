import { Component, OnInit } from '@angular/core';
import { MazeService } from '../../services/maze.service';
import { Maze } from '../../classes/maze';
import { Observable } from 'rxjs';
import { Block } from '../../classes/block';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  solveMaze(selectedAlgorithm: string) {
    const dialogRef = this.dialog.open(SpinnerComponent);
    if (!this.maze.start || !this.maze.end) {
      this.maze.start = this.maze.blocks[0][0];
      this.maze.end = this.maze.blocks[this.maze.rows - 1][this.maze.cols - 1];
    }
    this.mazeService.solveMaze(this.maze)
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
