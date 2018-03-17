import { Component, OnInit } from '@angular/core';
import { MazeService } from '../../services/maze.service';
import { Maze } from '../../classes/maze';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.css']
})
export class MazeComponent implements OnInit {

  algorithms: string[];
  selected: string;
  maze: Maze;
  maze$: Observable<Maze>;
  mazeId: number;

  constructor( private mazeService: MazeService) { }

  ngOnInit() {
    this.getAlgorithms();
  }

  getAlgorithms() {
    this.mazeService.getAlgorithms()
      .subscribe( algorithms => this.algorithms = algorithms);
  }

  getMaze() {
    // this.mazeService.getMaze()
    //  .subscribe( maze => this.maze = maze);
    this.maze$ = this.mazeService.getMaze();
  }

}
