import {Component, OnInit} from '@angular/core';
import {CheckersClientService} from "./services/checkers-client.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'checkersWithAngular';

  currentState: any;
  currentMove: any = "w"; //to be empty
  selectedPawnId: any;
  moveTo: any;

  properties01 :any = "r";
  properties03 :any = "r";
  properties05 :any = "r";
  properties07 :any = "r";

  properties10 :any = "r";
  properties12 :any = "r";
  properties14 :any = "r";
  properties16 :any = "r";

  properties21 :any = "r";
  properties23 :any = "r";
  properties25 :any = "r";
  properties27 :any = "r";

  properties30 :any = "o";
  properties32 :any = "o";
  properties34 :any = "o";
  properties36 :any = "o";

  properties41 :any = "o";
  properties43 :any = "o";
  properties45 :any = "o";
  properties47 :any = "o";

  properties50 :any = "w";
  properties52 :any = "w";
  properties54 :any = "w";
  properties56 :any = "w";

  properties61 :any = "w";
  properties63 :any = "w";
  properties65 :any = "w";
  properties67 :any = "w";

  properties70 :any = "w";
  properties72 :any = "w";
  properties74 :any = "w";
  properties76 :any = "w";

  constructor(private checkersClientService: CheckersClientService) {
  }

  action1(id: string, state: string) {

    //choose your pawn to move
    if (state == this.currentMove) {
      this.selectedPawnId = id
      this.moveTo = null
    }

    //choose destination if pawn is chosen
    if (state == "o" && this.selectedPawnId != null) {
      this.moveTo = id
    }

    //send request to the front
    if (this.moveTo != null && this.selectedPawnId != null) {

      this.currentState =
        this.currentMove +
        "/" +
        this.properties01 +
        this.properties03 +
        this.properties05 +
        this.properties07 +
        this.properties10 +
        this.properties12 +
        this.properties14 +
        this.properties16 +
        this.properties21 +
        this.properties23 +
        this.properties25 +
        this.properties27 +
        this.properties30 +
        this.properties32 +
        this.properties34 +
        this.properties36 +
        this.properties41 +
        this.properties43 +
        this.properties45 +
        this.properties47 +
        this.properties50 +
        this.properties52 +
        this.properties54 +
        this.properties56 +
        this.properties61 +
        this.properties63 +
        this.properties65 +
        this.properties67 +
        this.properties70 +
        this.properties72 +
        this.properties74 +
        this.properties76;

     let move = this.selectedPawnId.toString() + "->" + this.moveTo.toString();




      //send request to the front and receive new state
      this.checkersClientService.getBoardState(this.currentState, move).subscribe(value => {
        this.currentState = value;

        this.currentMove = (<string><unknown>value).split("/")[0]
        let newBoardState = (<string><unknown>value).split("/")[1].split("")

        this.properties01 = newBoardState[0]
        this.properties03 = newBoardState[1]
        this.properties05 = newBoardState[2]
        this.properties07 = newBoardState[3]
        this.properties10 = newBoardState[4]
        this.properties12 = newBoardState[5]
        this.properties14 = newBoardState[6]
        this.properties16 = newBoardState[7]
        this.properties21 = newBoardState[8]
        this.properties23 = newBoardState[9]
        this.properties25 = newBoardState[10]
        this.properties27 = newBoardState[11]
        this.properties30 = newBoardState[12]
        this.properties32 = newBoardState[13]
        this.properties34 = newBoardState[14]
        this.properties36 = newBoardState[15]
        this.properties41 = newBoardState[16]
        this.properties43 = newBoardState[17]
        this.properties45 = newBoardState[18]
        this.properties47 = newBoardState[19]
        this.properties50 = newBoardState[20]
        this.properties52 = newBoardState[21]
        this.properties54 = newBoardState[22]
        this.properties56 = newBoardState[23]
        this.properties61 = newBoardState[24]
        this.properties63 = newBoardState[25]
        this.properties65 = newBoardState[26]
        this.properties67 = newBoardState[27]
        this.properties70 = newBoardState[28]
        this.properties72 = newBoardState[29]
        this.properties74 = newBoardState[30]
        this.properties76 = newBoardState[31]
      })

      this.moveTo = null
      this.selectedPawnId = null

    }



  }

  ngOnInit(): void {
  }

}
