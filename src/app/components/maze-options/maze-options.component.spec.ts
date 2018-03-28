import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeOptionsComponent } from './maze-options.component';
import { MaterialModule } from '../../material/material.module';
import { MazeService } from '../../services/maze.service';
import { of } from 'rxjs/observable/of';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MazeOptionsComponent', () => {
  let component: MazeOptionsComponent;
  let fixture: ComponentFixture<MazeOptionsComponent>;
  const mockMazeService: any = jasmine.createSpyObj('MazeService', ['getAlgorithms']);

  const getAlgorithmsSpy = mockMazeService.getAlgorithms.and.returnValue( of(['BFS']) );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, NoopAnimationsModule],
      declarations: [ MazeOptionsComponent ],
      providers: [{provide: MazeService, useValue: mockMazeService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
