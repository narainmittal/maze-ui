import { Component, OnInit, Input } from '@angular/core';
import { Maze } from '../../classes/maze';
import { Block } from '../../classes/block';

@Component({
  selector: 'app-maze-display',
  templateUrl: './maze-display.component.html',
  styleUrls: ['./maze-display.component.css']
})
export class MazeDisplayComponent implements OnInit {

  @Input() maze: Maze;
  @Input() solution: Block[];

  constructor() { }

  ngOnInit() {
  }

}
