import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import {catchError, Observable, of} from "rxjs";
import {webSocket, WebSocketSubject} from "rxjs/webSocket";

const httpOptions = {
  headers: new HttpHeaders({
    // 'Content-Type': 'application/json',
     'Content-Type': 'text',
    // Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CheckersClientService {

//BACKEND ON SERVER OR FROM LOCALHOST
  //ROOT = 'https://backvisitting.herokuapp.com';
  ROOT = 'http://localhost:8081';
  WS_URL = "ws://localhost:8083/ws/aaa";

  constructor(private httpClient: HttpClient) {
  }

  // @ts-ignore
  public getState(board: string, currentColour: string, moveFrom: number, moveTo: number): Observable<T | State> {
    return this.httpClient.get<State>(this.ROOT + '/api/checkers' +
      '?board='         + board +
      '&currentColour=' + currentColour +
      '&moveFrom='      + moveFrom +
      '&moveTo='        + moveTo)
      // .pipe(catchError(this.errorHandler));
  }

  public getWebsocket(): WebSocketSubject<string> {
    return webSocket(this.WS_URL)
  };

  errorHandler(error: HttpErrorResponse) {
    return of(error.error.message);
  }

}

export interface State {
  board: string;
  currentColour: string;
}

