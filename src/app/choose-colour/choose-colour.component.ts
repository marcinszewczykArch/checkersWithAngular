import { Component, OnInit } from '@angular/core';
import {GameService} from "../services/game.service";
import {AppComponent} from "../app.component";
import {CheckersClientService} from "../services/checkers-client.service";

@Component({
  selector: 'app-choose-colour',
  templateUrl: './choose-colour.component.html',
  styleUrls: ['./choose-colour.component.css']
})
export class ChooseColourComponent {

  constructor(public appComponent: AppComponent, public checkersClientService: CheckersClientService) {
  }

  loadWhite() {
    this.appComponent.cleanContainer()
    this.appComponent.loadedWhite = true
    this.appComponent.loadedCurrentMove = true
    this.appComponent.loadedBoardBottom = true;
  }

  loadRed() {
    this.appComponent.cleanContainer()
    this.appComponent.loadedRed = true
    this.appComponent.loadedCurrentMove = true
    this.appComponent.loadedBoardBottom = true;
  }

  loadSavedGames() {
    this.appComponent.cleanContainer()
    this.appComponent.loadedSavedGames = true
  }

}
