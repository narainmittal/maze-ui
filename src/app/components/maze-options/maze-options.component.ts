import { MazeService } from '../../services/maze.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Grid } from '../../classes/grid';

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

  constructor(private mazeService: MazeService) {
    this.createMaze = new EventEmitter();
    this.solveMaze = new EventEmitter();
  }

  ngOnInit() {
    this.getAlgorithms();
  }

  getAlgorithms() {
    this.mazeService.getAlgorithms()
      .subscribe(algorithms => this.algorithms = algorithms);
  }

  onCreateMaze(rows: number, cols: number) {
    this.createMaze.emit(new Grid(rows, cols));
  }

  onSolveMaze(algorithm: string) {
    this.solveMaze.emit(algorithm);
  }
}
