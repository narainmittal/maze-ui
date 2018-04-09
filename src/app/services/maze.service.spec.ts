import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MazeService } from './maze.service';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpErrorResponse } from '@angular/common/http';

let httpMock;
let service: MazeService;

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
      expect(data.length).toBe(2);
    });

    const request = httpMock.expectOne(`${service.BASE_URL}/maze-solution/algorithms`);
    request.flush(['DFS', 'BFS']);
  });

  it('should retrieve the maze', () => {
    const mazeId = 5;
    const mockMazeData = {
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
      blocks: [
        { x: 0, y: 0 },
        { x: 1, y: 1 }
      ]
    };
    service.getMaze(mazeId).subscribe(data => {
      expect(data.blocks.length).toBe(2);
      expect(data.start).toBeDefined();
      expect(data.end).toBeDefined();
    });

    const request = httpMock.expectOne(`${service.BASE_URL}/maze/${mazeId}`);
    request.flush(mockMazeData);
  });

  it('should retrieve the maze with a default of 0', () => {
    const mockMazeData = {
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
      blocks: [
        { x: 0, y: 0 },
        { x: 1, y: 1 }
      ]
    };
    service.getMaze().subscribe(data => {
      expect(data.blocks.length).toBe(2);
      expect(data.start).toBeDefined();
      expect(data.end).toBeDefined();
    });

    const request = httpMock.expectOne(`${service.BASE_URL}/maze/0`);
    request.flush(mockMazeData);
  });

  it('should retrieve the maze solution', () => {
    const algorithm = 'DFS';
    const mazeId = 5;
    const solution = [
      { x: 0, y: 0 },
      { x: 1, y: 1 }
    ];
    service.solveMaze(algorithm, mazeId).subscribe(data => {
      expect(data.length).toBe(2);
    });

    const request = httpMock.expectOne(`${service.BASE_URL}/maze-solution/${mazeId}/solve?algorithm=${algorithm}`);
    request.flush(solution);
  });

  it('should call the handle error on failures', () => {
    const emsg = 'deliberate 404 error';
    spyOn(service, 'handleError');

    service.getAlgorithms().subscribe(
      data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        // expect(error.status).toEqual(404);
        expect(service.handleError).toHaveBeenCalledWith('getAlgorithms', []);
      }
    );

    const request = httpMock.expectOne(`${service.BASE_URL}/maze-solution/algorithms`);

    // Respond with mock error
    request.flush(emsg, { status: 404, statusText: 'Not Found' });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
