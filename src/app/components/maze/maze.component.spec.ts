import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeComponent } from './maze.component';
import { MaterialModule } from '../../material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MazeService } from '../../services/maze.service';
import { MatDialog } from '@angular/material';

describe('MazeComponent', () => {
  let component: MazeComponent;
  let fixture: ComponentFixture<MazeComponent>;
  const mockMazeService: any = jasmine.createSpyObj('MazeService', ['solveMaze', 'getMaze']);
  const mockMatDialog: any = jasmine.createSpyObj('MatDialog', [{'open': { 'close': jasmine.createSpy('close')  }}]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, NoopAnimationsModule],
      declarations: [ MazeComponent],
      providers: [{provide: MazeService, useValue: mockMazeService}, {provide: MatDialog, useValue: mockMatDialog}],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
