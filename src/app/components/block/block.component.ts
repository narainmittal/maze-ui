import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Block } from '../../classes/block';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
  @Input() block: Block;
  @Input() start: boolean;
  @Input() end: boolean;
  @Input() isSolution: boolean;


  constructor() { }

  ngOnInit() {

  }

}
