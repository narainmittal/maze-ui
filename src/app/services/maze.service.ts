
import {throwError as observableThrowError,  Observable ,  of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Maze } from '../classes/maze';
import { Block } from '../classes/block';
import { Grid } from '../classes/grid';
import { environment } from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class MazeService {

  readonly BASE_URL = environment.APP_URL;

  constructor(private http: HttpClient) { }

  getAlgorithms(): Observable<string[]> {
    return this.http.get<string[]>(this.BASE_URL + '/maze-solution/algorithms')
      .pipe(
        tap(algorithms => this.log(`fetched algorithms`)),
        catchError(this.handleError('getAlgorithms', []))
      );
  }

  getMaze(mazeId: number = 0): Observable<Maze> {
    return this.http.get<Maze>(this.BASE_URL + `/maze/${mazeId}`)
      .pipe(
        tap(_ => this.log(`fetched maze with id: ${mazeId}`)),
        catchError(this.handleError('getMaze', new Maze))
      );
  }

  createMaze(grid: Grid): Observable<Maze> {
    return this.http.post<Maze>(this.BASE_URL + `/create`, grid, httpOptions)
      .pipe(
        tap( response => this.log(`created maze with grid: ${grid.rows}*${grid.cols} `)),
        catchError(this.handleError('createMaze', new Maze))
      );
  }

  solveMaze(maze: Maze): Observable<Block[]> {
    return this.http.post<Block[]>(this.BASE_URL + `/solve`, maze, httpOptions)
      .pipe(
        tap(_ => this.log(`trying to solve maze with start: ${maze.start}, end:${maze.end}`)),
        catchError(this.handleError('solveMaze', Block[0]))
      );
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(`${operation} failed:`);
      console.error(error);

      // Throw the error back
      return observableThrowError(error);
    };
  }

  log(message: string) {
    console.log('MazeService: ' + message);
  }

}
