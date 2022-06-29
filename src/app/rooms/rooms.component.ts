import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import {WebsocketService} from "../services/websocket.service";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  constructor(public appComponent: AppComponent, public websocketService: WebsocketService) { }

  ngOnInit(): void {
  }

  enterRoom(roomName: string): void {
    this.appComponent.loadedRooms = false
    this.appComponent.loadedPlayers = false
    this.appComponent.loadedChat = true
    this.appComponent.loadedWhite = true
    this.appComponent.loadedCurrentMove = true
    this.websocketService.joinRoom(roomName)
  }

}
