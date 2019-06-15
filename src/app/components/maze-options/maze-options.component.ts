import { MazeService } from '../../services/maze.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Grid } from '../../classes/grid';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-maze-options',
  templateUrl: './maze-options.component.html',
  styleUrls: ['./maze-options.component.css']
})
export class MazeOptionsComponent implements OnInit {
  @Input() mazeCreated: boolean;
  @Output() createMaze: EventEmitter<Grid>;
  @Output() solveMaze: EventEmitter<string>;

  algorithms: string[];

  constructor(private mazeService: MazeService, private messageService: MessageService, private snackBar: MatSnackBar) {
    this.createMaze = new EventEmitter();
    this.solveMaze = new EventEmitter();
  }

  ngOnInit() {
    this.getAlgorithms();
  }

  getAlgorithms() {
    this.mazeService.getAlgorithms()
      .subscribe(
        algorithms => this.algorithms = algorithms,
        error => this.openSnackBar(this.messageService.parseError(error)));
  }

  onCreateMaze(rows: number, cols: number) {
    this.createMaze.emit(new Grid(rows, cols));
  }

  onSolveMaze(algorithm: string) {
    this.solveMaze.emit(algorithm);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'close');
  }
}
