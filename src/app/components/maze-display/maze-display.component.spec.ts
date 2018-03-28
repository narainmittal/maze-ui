import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeDisplayComponent } from './maze-display.component';
import { MaterialModule } from '../../material/material.module';
import { BlockComponent } from '../block/block.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MazeDisplayComponent', () => {
  let component: MazeDisplayComponent;
  let fixture: ComponentFixture<MazeDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ MazeDisplayComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
