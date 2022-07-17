import {Component} from '@angular/core';
import {WebsocketService} from "../services/websocket.service";
import {AppComponent} from "../app.component";
import {GameStateService} from "../services/game-state.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  constructor(public appComponent: AppComponent, public websocketService: WebsocketService, public gameStateService: GameStateService) {
  }

  giveUp(): void {
    this.websocketService.leaveRoom()
    this.appComponent.loadedRed = false
    this.appComponent.loadedWhite = false
    this.appComponent.loadedRooms = true
    this.appComponent.loadedPlayers = true
    this.appComponent.loadedChat = false
  }

}
