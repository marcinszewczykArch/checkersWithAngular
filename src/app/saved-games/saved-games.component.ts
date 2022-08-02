import { Component, OnInit } from '@angular/core';
import {CheckersClientService, GameStateTo} from "../services/checkers-client.service";
import {GameStateService} from "../services/game-state.service";
import {ChooseColourComponent} from "../choose-colour/choose-colour.component";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-saved-games',
  templateUrl: './saved-games.component.html',
  styleUrls: ['./saved-games.component.css']
})
export class SavedGamesComponent implements OnInit {
  savedStates: any

  constructor(public checkersClientService: CheckersClientService, public gameStateService: GameStateService, public appComponent: AppComponent) { }

  ngOnInit(): void {
    this.checkersClientService.getSavedStates().subscribe(value => {
      this.savedStates = value;
    })
  }


  loadState(gameStateTo: GameStateTo) {
    this.gameStateService.board = gameStateTo.board
    this.gameStateService.movesNow = gameStateTo.movesNow
    this.gameStateService.nextMoveBy = gameStateTo.nextMoveBy
    this.gameStateService.status = gameStateTo.status
    this.gameStateService.movesNow2.next(gameStateTo.movesNow)
    this.gameStateService.error = null

    this.appComponent.cleanContainer()
    this.appComponent.loadedCurrentMove = true
  }

  loadStateAsWhite(gameStateTo: GameStateTo){
    this.loadState(gameStateTo)
    this.appComponent.loadedWhite = true
    this.appComponent.loadedBoardBottom = true;
  }

  loadStateAsRed(gameStateTo: GameStateTo){
    this.loadState(gameStateTo)
    this.appComponent.loadedRed = true
    this.appComponent.loadedBoardBottom = true;
  }
}
