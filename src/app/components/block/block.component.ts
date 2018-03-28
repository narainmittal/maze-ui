import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Block } from '../../classes/block';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
  @Input() block: Block;
  @Input() solution: Block[];
  @Input() start: boolean;
  @Input() end: boolean;

  constructor() { }

  ngOnInit() {
  }

  inSolution(block: Block): boolean {
    return !!(this.solution && this.solution.filter(b => block.x === b.x && block.y === b.y).length > 0);
  }

}
