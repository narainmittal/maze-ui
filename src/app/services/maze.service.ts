import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Maze } from '../classes/maze';
import { Block } from '../classes/block';


@Injectable()
export class MazeService {

  readonly BASE_URL = 'http://localhost:8080/maze-app';

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

  solveMaze(algorithm: string, mazeId: number = 0): Observable<Block[]> {
    return this.http.get(this.BASE_URL + `/maze-solution/${mazeId}/solve`, { params: { 'algorithm': algorithm } })
      .pipe(
        tap(_ => this.log(`trying to solve maze : ${mazeId} with algorithm: ${algorithm}`)),
        catchError(this.handleError('solveMaze', Block[0]))
      );
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  log(message: string) {
    console.log('MazeService: ' + message);
  }

}
