import { Component, OnInit } from '@angular/core';
import {GameService} from "../services/game.service";
import {AppComponent} from "../app.component";
import {GameStateService} from "../services/game-state.service";
import {CheckersClientService} from "../services/checkers-client.service";

@Component({
  selector: 'app-choose-single-multi',
  templateUrl: './choose-single-multi.component.html',
  styleUrls: ['./choose-single-multi.component.css']
})
export class ChooseSingleMultiComponent {

  constructor(public appComponent: AppComponent, public gameStateService: GameStateService, public gameService: GameService) {
  }

  loadMultiPlayer() {
    this.appComponent.cleanContainer()
    this.gameService.getInitialState()
    this.gameStateService.isGameMultiplayer = true
    this.appComponent.loadedLogin = true
  }

  loadSinglePlayer() {
    this.appComponent.cleanContainer()
    this.gameService.getInitialState()
    this.gameStateService.isGameMultiplayer = false
    this.appComponent.loadedChooseColour = true
  }



}
