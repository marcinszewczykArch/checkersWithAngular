import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import {catchError, Observable, of} from "rxjs";
import {webSocket, WebSocketSubject} from "rxjs/webSocket";
import {GameStateService} from "./game-state.service";

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
export class CheckersClientService { //todo: HttpService

//BACKEND ON SERVER OR FROM LOCALHOST
  //ROOT = 'https://backvisitting.herokuapp.com';
  ROOT = 'http://localhost:9001';
  WS_URL = "ws://localhost:8083/ws/aaa";

  constructor(private httpClient: HttpClient, public gameStateService: GameStateService) {
  }

  // @ts-ignore
  public getState(board: string, currentColour: string, moveFrom: string, moveTo: string): Observable<T | GameState> {
    return this.httpClient.get<GameState>(this.ROOT + '/checkers' +
      '?board='         + board +
      '&currentColour=' + currentColour +
      '&moveFrom='      + moveFrom +
      '&moveTo='        + moveTo)
      // .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return of(error.error.message);
  }

  makeMove(board: string, colour: string, from: string, to: string): void {
    this.getState(board, colour, from, to).subscribe(
      newState => {
        this.gameStateService.board = newState.board
        this.gameStateService.movesNow = newState.movesNow
        this.gameStateService.error = null
      },
      error => {
        this.gameStateService.error = error.error
      }
    )
  }

}

  export interface Status {
    tag: string;
  }

  export interface GameState {
    status: Status;
    movesNow: string;
    board: string;
    nextMoveBy: string;
  }
