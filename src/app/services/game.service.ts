import { Injectable } from '@angular/core';
import {CheckersClientService, GameState} from "./checkers-client.service";
import {webSocket} from "rxjs/webSocket";
import {WebsocketService} from "./websocket.service";
import {GameStateService} from "./game-state.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  // board: any;
  // currentColour: any;
  moveFrom: any;
  moveTo: any;
  hi: any = Array<string>(31); ///highlight array
  error: any;
  received: any;

  constructor(private checkersClientService: CheckersClientService, public websocketService: WebsocketService, public gameStateService: GameStateService) {
  }

  action1(id: string) {

    this.hi = Array<string>(31)

    //choose your pawn to move
    if (this.gameStateService.board[id] == this.gameStateService.movesNow) {
      this.moveFrom = id
      this.hi[id] = "hi"
      this.moveTo = null
    }

    //choose destination if pawn is chosen
    if (this.gameStateService.board[id] == "o" && this.moveFrom != null) {
      this.moveTo = id
    }

    //send request to the front and receive new state
    if (this.moveTo != null && this.moveFrom != null) {

//------------------------------------------------start of part is for http connection---------------------------------
      this.checkersClientService.getState(this.gameStateService.board, this.gameStateService.movesNow, this.moveFrom, this.moveTo).subscribe(
        newState => {
              this.gameStateService.board = newState.board
              this.gameStateService.movesNow = newState.movesNow
              this.error = null},
      error => {this.error = error.error}
      )
//------------------------------------------------end of part  for http connection--------------------------------------

//------------------------------------------------start of part is for ws connection------------------------------------
      this.websocketService.makeMove(this.gameStateService.board, this.gameStateService.movesNow, this.moveFrom, this.moveTo)
//------------------------------------------------end of part  for ws connection----------------------------------------

      this.moveTo = null
      this.moveFrom = null
      this.hi[id] = null
    }
  }

  ngOnInit(): void {
    this.gameStateService.board = 'rrrrrrrrrrrroooooooowwwwwwwwwwww' //todo: remove when initial state comes from backend
    this.gameStateService.movesNow = 'w'//todo: remove when initial state comes from backend

    webSocket("ws://localhost:8083/ws/").subscribe(
      msg   => {
        this.received = msg
        console.log(msg)},
      err   => console.log(err),
      () => console.log("connection is closed")
    )
  }

}
