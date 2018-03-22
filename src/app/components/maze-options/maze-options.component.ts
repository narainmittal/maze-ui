import { MazeService } from '../../services/maze.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-maze-options',
  templateUrl: './maze-options.component.html',
  styleUrls: ['./maze-options.component.css']
})
export class MazeOptionsComponent implements OnInit {
  @Output() getMaze: EventEmitter<any>;
  @Output() solveMaze: EventEmitter<string>;

  algorithms: string[];

  constructor( private mazeService: MazeService) {
    this.getMaze = new EventEmitter();
    this.solveMaze = new EventEmitter();
  }

  ngOnInit() {
    this.getAlgorithms();
  }

  getAlgorithms() {
    this.mazeService.getAlgorithms()
      .subscribe(algorithms => this.algorithms = algorithms);
  }

  onGetMaze () {
    this.getMaze.emit();
  }

  onSolveMaze(algorithm: string) {
    this.solveMaze.emit(algorithm);
  }
}
