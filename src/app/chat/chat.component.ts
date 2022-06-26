import { Component, OnInit } from '@angular/core';
import {WebsocketService} from "../services/websocket.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(public websocketService: WebsocketService) { }

  ngOnInit(): void {
  }

}
