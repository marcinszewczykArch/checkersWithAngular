import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../app.component";
import {WebsocketService} from "../services/websocket.service";

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent {

  constructor(public websocketService: WebsocketService) { }

}
