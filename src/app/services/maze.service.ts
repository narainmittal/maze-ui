import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class MazeService {

  private BASE_URL = 'http://localhost:8080/maze-app';

  constructor( private http: HttpClient) { }

  getAlgorithms (): Observable<string[]> {
    return this.http.get<string[]>(this.BASE_URL + '/maze-solution/algorithms').pipe(
        tap(algorithms => this.log(`fetched algorithms`)),
        catchError(this.handleError('getHeroes', []))
      );
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('MazeService: ' + message);
  }

}
