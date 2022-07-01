import { Component, OnInit } from '@angular/core';
import {CheckersClientService} from "../services/checkers-client.service";
import {GameService} from "../services/game.service";
import {GameStateService} from "../services/game-state.service";
import {delay} from "rxjs";

@Component({
  selector: 'app-board-for-white',
  templateUrl: './board-for-white.component.html',
  styleUrls: ['./board-for-white.component.css']
})
export class BoardForWhiteComponent implements OnInit {

  constructor(public gameService: GameService, public gameStateService: GameStateService) {
  }

  makeMoveWhite(id: string) {
    this.gameService.makeMove(id, "w")
  }

  makeMoveAi() {
    this.gameService.makeMoveAi("r")
  }

  ngOnInit(): void {
    this.gameStateService.movesNow2.subscribe(
      movesNow => {if (movesNow = "r") {this.gameService.makeMoveAi("r")}}
    );
  }

}
