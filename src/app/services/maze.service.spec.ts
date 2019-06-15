import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MazeService } from './maze.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Maze } from '../classes/maze';

let httpMock;
let service: MazeService;
const mockMazeData = {
  'start': {
    'x': 0,
    'y': 0
  },

  'end': {
    'x': 2,
    'y': 2
  },
  'rows': 3,
  'cols': 3,
  'blocks': [
    [
      {
        'x': 0,
        'y': 0,
        'dir': 7,
        'downWall': true,
        'rightWall': false
      },
      {
        'x': 0,
        'y': 1,
        'dir': 3,
        'downWall': true,
        'rightWall': false
      },
      {
        'x': 0,
        'y': 2,
        'dir': 9,
        'downWall': false,
        'rightWall': true
      }
    ],
    [
      {
        'x': 1,
        'y': 0,
        'dir': 5,
        'downWall': false,
        'rightWall': false
      },
      {
        'x': 1,
        'y': 1,
        'dir': 11,
        'downWall': true,
        'rightWall': true
      },
      {
        'x': 1,
        'y': 2,
        'dir': 12,
        'downWall': false,
        'rightWall': true
      }
    ],
    [
      {
        'x': 2,
        'y': 0,
        'dir': 6,
        'downWall': true,
        'rightWall': false
      },
      {
        'x': 2,
        'y': 1,
        'dir': 3,
        'downWall': true,
        'rightWall': false
      },
      {
        'x': 2,
        'y': 2,
        'dir': 10,
        'downWall': true,
        'rightWall': true
      }
    ]
  ]
};

const mockSolutionData = [
  {
    'x': 0,
    'y': 0
  },
  {
    'x': 0,
    'y': 1
  },
  {
    'x': 0,
    'y': 2
  },
  {
    'x': 1,
    'y': 2
  },
  {
    'x': 2,
    'y': 2
  }
];

describe('MazeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MazeService]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(MazeService);
  });

  it('should be created', inject([MazeService], (serviceLocal: MazeService) => {
    expect(serviceLocal).toBeTruthy();
  }));

  it('should get the algorithms list', () => {
    service.getAlgorithms().subscribe(data => {
      expect(data.length).toBe(1);
    });
  });

  it('should create the maze', () => {
    const mockCreate = {
      rows: 3,
      cols: 3
    };

    service.createMaze(mockCreate).subscribe(data => {
      expect(data.blocks.length).toBe(3);
      expect(data.blocks[0].length).toBe(3);
    });

    const request = httpMock.expectOne(`${service.BASE_URL}/create`);
    request.flush(mockMazeData);
  });

  it('should solve the maze', () => {
    service.solveMaze(mockMazeData).subscribe(data => {
      expect(data).toBeDefined();
      expect(data.length).toBeGreaterThan(0);
    });

    const request = httpMock.expectOne(`${service.BASE_URL}/solve`);
    request.flush(mockSolutionData);
  });


  it('should call the handle error on failures', () => {
    const emsg = 'deliberate 404 error';
    spyOn(service, 'handleError');

    service.createMaze(mockMazeData).subscribe(
      data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        // expect(error.status).toEqual(404);
        expect(service.handleError).toHaveBeenCalledWith('createMaze', jasmine.any(Maze));
      }
    );

    const request = httpMock.expectOne(`${service.BASE_URL}/create`);

    // Respond with mock error
    request.flush(emsg, { status: 404, statusText: 'Not Found' });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
