import {Component, OnInit} from '@angular/core';
import {GameService} from "./services/game.service";
import {LoginComponent} from "./login/login.component";
import {WebsocketService} from "./services/websocket.service";
import {GameStateService} from "./services/game-state.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'checkersWithAngular';

  loadedChooseColour: Boolean = false;
  loadedWhite: Boolean = false;
  loadedRed: Boolean = false;
  loadedCurrentMove: Boolean = false;

  loadedChooseSingleMulti: Boolean = true;
  loadedSinglePlayer: Boolean = false;
  loadedMultiPlayer: Boolean = false;

  loadedLogin: Boolean = false;
  loadedChat: Boolean = false;
  loadedRooms: Boolean = false;
  loadedPlayers: Boolean = false;
  loadedRules: Boolean = false;

  constructor(public gameService: GameService, public websocketService: WebsocketService, public gameStateService: GameStateService) {
  }

  cleanContainer() {
    this.loadedChooseColour = false;
    this.loadedWhite = false;
    this.loadedRed = false;
    this.loadedCurrentMove = false;

    this.loadedChooseSingleMulti = false;
    this.loadedSinglePlayer = false;
    this.loadedMultiPlayer = false;

    this.loadedLogin = false;
    this.loadedChat = false;
    this.loadedRooms = false;
    this.loadedPlayers = false;
    this.loadedRules = false;
  }

  ngOnInit(): void {
  }


}
