import { MazeService } from '../../services/maze.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maze-options',
  templateUrl: './maze-options.component.html',
  styleUrls: ['./maze-options.component.css']
})
export class MazeOptionsComponent implements OnInit {

  algorithms: string[];
  selected: string;

  constructor( private mazeService: MazeService) { }

  ngOnInit() {
    this.getAlgorithms();
  }

  getAlgorithms() {
    this.mazeService.getAlgorithms().subscribe( algorithms => this.algorithms = algorithms);
  }
}
