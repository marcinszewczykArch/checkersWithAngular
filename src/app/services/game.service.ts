import { Injectable } from '@angular/core';
import {CheckersClientService, GameState} from "./checkers-client.service";
import {webSocket} from "rxjs/webSocket";
import {WebsocketService} from "./websocket.service";
import {GameStateService} from "./game-state.service";

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

    //block to start multiplayer game if there is no opponent
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

    //send request to the front and receive new state
    if (this.moveTo != null && this.moveFrom != null) {

      if (!this.gameStateService.isGameMultiplayer) { //http connection
        this.checkersClientService
          .makeMove(this.gameStateService.board, this.gameStateService.movesNow, this.moveFrom, this.moveTo)

      } else { //ws connection
        this.websocketService
          .makeMove(this.gameStateService.board, this.gameStateService.movesNow, this.moveFrom, this.moveTo)
      }


      this.moveTo = null
      this.moveFrom = null
      this.highlight[id] = null
    }
  }

}
