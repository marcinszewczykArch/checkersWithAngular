import { Component, OnInit } from '@angular/core';
import {GameService} from "../services/game.service";
import {GameStateService} from "../services/game-state.service";

@Component({
  selector: 'app-current-move',
  templateUrl: './current-move.component.html',
  styleUrls: ['./current-move.component.css']
})
export class CurrentMoveComponent {

  constructor(public gameService: GameService, public gameStateService: GameStateService) {
  }
}
