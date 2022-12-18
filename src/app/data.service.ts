import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {  throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Data } from './data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

 
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRequest(): Observable<Data[]>  {
    return this.httpClient.get<Data[]>(this.REST_API_SERVER).pipe(retry(3),catchError(this.handleError));
  }
}
