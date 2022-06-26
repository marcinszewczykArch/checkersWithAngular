import { Injectable } from '@angular/core';
import {CheckersClientService, State} from "./checkers-client.service";
import {webSocket} from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  board: any = 'rrrrrrrrrrrroooooooowwwwwwwwwwww'
  currentColour: any = 'w'
  moveFrom: any;
  moveTo: any;
  hi: any = Array<string>(31); ///highlight array
  error: any;
  received: any;

  constructor(private checkersClientService: CheckersClientService) {
  }

  action1(id: string) {

    this.hi = Array<string>(31)

    //choose your pawn to move
    if (this.board[id] == this.currentColour) {
      this.moveFrom = id
      this.hi[id] = "hi"
      this.moveTo = null
    }

    //choose destination if pawn is chosen
    if (this.board[id] == "o" && this.moveFrom != null) {
      this.moveTo = id
    }

    //send request to the front and receive new state
    if (this.moveTo != null && this.moveFrom != null) {

//------------------------------------------------start of part is for http connection---------------------------------
      this.checkersClientService.getState(this.board, this.currentColour, this.moveFrom, this.moveTo).subscribe(
        newState => {
              this.board = newState.board
              this.currentColour = newState.movesNow
              this.error = null},
      error => {this.error = error.error}
      )
//------------------------------------------------end of part  for http connection--------------------------------------

//------------------------------------------------start of part is for ws connection------------------------------------
      this.checkersClientService.getState(this.board, this.currentColour, this.moveFrom, this.moveTo).subscribe(
        newState => {
          this.board = newState.board
          this.currentColour = newState.movesNow
          this.error = null},
        error => {this.error = error.error}
      )
//------------------------------------------------end of part  for ws connection----------------------------------------

      this.moveTo = null
      this.moveFrom = null
      this.hi[id] = null
    }
  }

  ngOnInit(): void {
    webSocket("ws://localhost:8083/ws/").subscribe(
      msg   => {
        this.received = msg
        console.log(msg)},
      err   => console.log(err),
      () => console.log("connection is closed")
    )
  }

}
