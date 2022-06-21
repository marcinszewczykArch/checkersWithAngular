import { Injectable } from '@angular/core';
import {CheckersClientService, State} from "./checkers-client.service";

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
      this.checkersClientService.getState(this.board, this.currentColour, this.moveFrom, this.moveTo).subscribe(
        newState => {
              this.board = newState.board
              this.currentColour = newState.movesNow
              this.error = null},
      error => {this.error = error.error}
      )

      this.moveTo = null
      this.moveFrom = null
      this.hi[id] = null
    }
  }

  ngOnInit(): void {
  }

}
