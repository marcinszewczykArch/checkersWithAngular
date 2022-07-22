import { Component, OnInit } from '@angular/core';
import {GameService} from "../services/game.service";
import {GameStateService} from "../services/game-state.service";
import {delay} from "rxjs";
import {CheckersClientService} from "../services/checkers-client.service";

@Component({
  selector: 'app-board-for-red',
  templateUrl: './board-for-red.component.html',
  styleUrls: ['./board-for-red.component.css']
})
export class BoardForRedComponent implements OnInit {

  constructor(public gameService: GameService, public gameStateService: GameStateService) {
  }

  makeMoveRed(id: string) {
    this.gameService.makeMove(id, "r")
  }

  makeMoveAi() {
    this.gameService.makeMoveAi("w")
  }

  ngOnInit(): void {
    this.gameStateService.movesNow2.subscribe(
      value => {if (value = "w") {this.gameService.makeMoveAi("w")}}
    );
  }

}
