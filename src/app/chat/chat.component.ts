import {Component, OnInit} from '@angular/core';
import {WebsocketService} from "../services/websocket.service";
import {AppComponent} from "../app.component";
import {GameStateService} from "../services/game-state.service";
import {Room} from "../services/checkers-client.service";

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
    this.appComponent.cleanContainer()
    this.appComponent.loadedRooms = true
    this.appComponent.loadedPlayers = true
  }

  getPlayers(): string[] {
    // @ts-ignore
    let room: Room = this.websocketService.multiplayerState.rooms.find(room => room.name == this.gameStateService.roomName)
    return room.players
  }
}
