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

  constructor(public gameService: GameService, public websocketService: WebsocketService, public gameStateService: GameStateService) {
  }

  ngOnInit(): void {
  }


}
