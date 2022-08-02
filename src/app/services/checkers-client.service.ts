import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import {catchError, Observable, of} from "rxjs";
import {webSocket, WebSocketSubject} from "rxjs/webSocket";
import {GameStateService} from "./game-state.service";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    //  'Content-Type': 'text',
    // Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CheckersClientService { //todo: HttpService

//BACKEND ON SERVER OR FROM LOCALHOST
  ROOT = 'https://checkersone.herokuapp.com';
  // ROOT = 'http://localhost:9000';

  constructor(private httpClient: HttpClient, public gameStateService: GameStateService) {
  }

  // @ts-ignore
  public getState(board: string, currentColour: string, nextMoveBy: string, status: string, moveFrom: string, moveTo: string): Observable<T | GameState> {
    return this.httpClient.get<GameState>(this.ROOT + '/checkers' +
      '?board='         + board +
      '&currentColour=' + currentColour +
      '&nextMoveBy='    + nextMoveBy +
      '&status='        + status +
      '&moveFrom='      + moveFrom +
      '&moveTo='        + moveTo)
  }

  // @ts-ignore
  public getInitialState(): Observable<T | GameState> {
    return this.httpClient.get<GameState>(this.ROOT + '/initialstate')
  }

  // @ts-ignore
  public getSavedStates(): Observable<T | GameStateTo> {
    return this.httpClient.get<GameStateTo>(this.ROOT + '/state')
  }

  public postGameState(gameStateTo: GameStateTo): Observable<GameStateTo> {
    return this.httpClient.post<GameStateTo>(this.ROOT + '/state', gameStateTo, httpOptions)
  }

  // @ts-ignore
  public saveGame(saveName: string){

    let nextMoveBy = ""
    if (this.gameStateService.nextMoveBy != null) {
      nextMoveBy = this.gameStateService.nextMoveBy.toString()
    }

    let gameStateTo:  GameStateTo = {
      timestamp: "",
      status: this.gameStateService.status,
      movesNow: this.gameStateService.movesNow,
      board: this.gameStateService.board,
      nextMoveBy: nextMoveBy,
      saveName: saveName,
    };

    this.postGameState(gameStateTo)
      .subscribe(
        result => {
              console.log(result)
              alert("game saved!")
        },
          error => {
              console.log(error)
              alert("error")
        }
      )
  }

  // public getStatePost(move: Move): Observable<GameState> {
  //   return this.httpClient.post<GameState>(this.ROOT + '/checkers', move)
  // }

  // @ts-ignore
  public getStateAi(board: string, currentColour: string, nextMoveBy: string, status: string): Observable<T | GameState> {
    return this.httpClient.get<GameState>(this.ROOT + '/checkersAi' +
      '?board='         + board +
      '&currentColour=' + currentColour +
      '&nextMoveBy='    + nextMoveBy +
      '&status='        + status)
  }


}


export interface MultiplayerState {
  players: string[];
  rooms: Room[];
}

export interface Room {
  name: string;
  players: string[];
  gameState: GameState;
}

export interface GameState {
  status: string;
  movesNow: string;
  board: string;
  nextMoveBy: string;
}

export interface GameStateTo {
  timestamp: string;
  status: string;
  movesNow: string;
  board: string;
  nextMoveBy: string;
  saveName: string;
}

