import { Component, OnInit } from '@angular/core';
import {GameService} from "../services/game.service";
import {GameStateService} from "../services/game-state.service";

@Component({
  selector: 'app-board-for-red',
  templateUrl: './board-for-red.component.html',
  styleUrls: ['./board-for-red.component.css']
})
export class BoardForRedComponent {

  constructor(public gameService: GameService, public gameStateService: GameStateService) {
  }

  makeMoveRed(id: string) {
    this.gameService.makeMove(id, "r")
  }

}
