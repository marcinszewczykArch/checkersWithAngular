import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import {WebsocketService} from "../services/websocket.service";
import {GameStateService} from "../services/game-state.service";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {

  newRoomName: string

  constructor(public appComponent: AppComponent, public websocketService: WebsocketService) { }

  enterRoom(roomName: string): void {
    this.appComponent.loadedRooms = false
    this.appComponent.loadedPlayers = false
    this.appComponent.loadedChat = true
    this.appComponent.loadedRed = true
    this.appComponent.loadedCurrentMove = true
    this.websocketService.joinRoom(roomName)
  }

  createRoom(roomName: string): void {
    this.appComponent.loadedRooms = false
    this.appComponent.loadedPlayers = false
    this.appComponent.loadedChat = true
    this.appComponent.loadedWhite = true
    this.appComponent.loadedCurrentMove = true
    this.websocketService.createNewRoom(roomName)
  }

}
