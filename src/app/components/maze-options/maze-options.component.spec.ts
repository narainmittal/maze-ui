import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeOptionsComponent } from './maze-options.component';

describe('MazeOptionsComponent', () => {
  let component: MazeOptionsComponent;
  let fixture: ComponentFixture<MazeOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MazeOptionsComponent ]
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
