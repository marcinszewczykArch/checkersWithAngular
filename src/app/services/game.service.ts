import { Injectable } from '@angular/core';
import {CheckersClientService, GameState} from "./checkers-client.service";
import {webSocket} from "rxjs/webSocket";
import {WebsocketService} from "./websocket.service";
import {GameStateService} from "./game-state.service";
import {delay} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {  //todo: MoveService
  moveFrom: any;
  moveTo: any;
  highlight: any = Array<string>(31); ///highlight array
  error: any;
  received: any;

  constructor(private checkersClientService: CheckersClientService, public websocketService: WebsocketService, public gameStateService: GameStateService) {
  }

  makeMove(id: string, colour: string) {
    //allow to make a move by pawn of your colour only
    if (this.gameStateService.movesNow != colour) {
      return;
    }

    //todo: block to start multiplayer game if there is no opponent
    // if (this.gameStateService.isGameMultiplayer && room.members.size < 2) {
    //   send error("wait for your opponent to start a game")
    //   return;
    // }

    //clear a highlight board
    this.highlight = Array<string>(31)

    //choose your pawn to move
    if (this.gameStateService.board[id] == this.gameStateService.movesNow) {
      this.moveFrom = id
      this.moveTo = null
      this.highlight[id] = "hi"
    }

    //choose destination if pawn is chosen
    if (this.gameStateService.board[id] == "o" && this.moveFrom != null) {
      this.moveTo = id
    }

    //send request to the backend and receive new state
    if (this.moveTo != null && this.moveFrom != null) {

      if (!this.gameStateService.isGameMultiplayer) { //http connection for singlePlayer
        this.checkersClientService.getState(this.gameStateService.board, this.gameStateService.movesNow, this.moveFrom, this.moveTo).subscribe(
          newState => {
            this.gameStateService.board = newState.board
            this.gameStateService.movesNow = newState.movesNow
            this.gameStateService.movesNow2.next( newState.movesNow)
            this.gameStateService.error = null
          },
          error => {
            this.gameStateService.error = error.error
          }
        )

      } else { //ws connection for multiPlayer
        this.websocketService
          .makeMove(this.gameStateService.board, this.gameStateService.movesNow, this.moveFrom, this.moveTo)
      }


      this.moveTo = null
      this.moveFrom = null
      this.highlight[id] = null
    }
  }

  makeMoveAi(colourAi: string) {
    if (!this.gameStateService.isGameMultiplayer && this.gameStateService.movesNow == colourAi) {
       // this.sleep(1000)

      this.checkersClientService.getStateAi(this.gameStateService.board, colourAi).subscribe(
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

  sleep(milliseconds: number) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

}
