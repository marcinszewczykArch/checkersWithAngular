import {Component, OnInit} from '@angular/core';
import {CheckersClientService} from "./services/checkers-client.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentState: any;   // currentMove/boardState todo: change it for json
  boardState: any;
  currentMove: any;
  hi: any = Array<string>(31); ///highlight array

  selectedPawnId: any;
  moveTo: any;

  constructor(private checkersClientService: CheckersClientService) {
  }

  action1(id: string) {

    //choose your pawn to move
    if (this.boardState[id] == this.currentMove) {
      this.selectedPawnId = id
      this.hi[id] = "hi"
      this.moveTo = null
    }

    //choose destination if pawn is chosen
    if (this.boardState[id] == "o" && this.selectedPawnId != null) {
      this.moveTo = id
    }

    //send request to the front and receive new state
    if (this.moveTo != null && this.selectedPawnId != null) {
     let move = this.selectedPawnId.toString() + "->" + this.moveTo.toString();

      this.checkersClientService.getBoardState(this.currentState, move).subscribe(value => {
        this.currentState = value;
        this.currentMove = (<string><unknown>value).split("/")[0]
        this.boardState = (<string><unknown>value).split("/")[1].split("")
      })

      this.moveTo = null
      this.selectedPawnId = null
      this.hi[id] = null
    }
  }

  ngOnInit(): void {
    //initial state -> should be taken from the backend
    this.currentState = 'w/rrrrrrrrrrrroooooooowwwwwwwwwwww'
    this.currentMove = (<string><unknown>this.currentState).split("/")[0]
    this.boardState = (<string><unknown>this.currentState).split("/")[1].split("")
  }

}
