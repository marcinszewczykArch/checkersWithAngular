import {Component, OnInit} from '@angular/core';
import {CheckersClientService} from "./services/checkers-client.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  board: any;
  currentColour: any;
  moveFrom: any;
  moveTo: any;
  hi: any = Array<string>(31); ///highlight array



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
      this.checkersClientService.getState(this.board, this.currentColour, this.moveFrom, this.moveTo).subscribe(newState => {
        this.board = newState.board
        this.currentColour = newState.currentColour
      })

      this.moveTo = null
      this.moveFrom = null
      this.hi[id] = null
    }
  }

  ngOnInit(): void {
    //initial state -> should be taken from the backend
    this.currentColour = 'w'
    this.board = 'rrrrrrrrrrrroooooooowwwwwwwwwwww'
  }

}
