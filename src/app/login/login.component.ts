import { Component, OnInit } from '@angular/core';
import {WebsocketService} from "../services/websocket.service";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public appComponent: AppComponent, public websocketService: WebsocketService) { }

  ngOnInit(): void {

  }

  login(playerName: string): void {
    this.websocketService.initializeWebsocket(playerName)
    this.websocketService.makeConnection()
    this.appComponent.loadedLogin = false
    this.appComponent.loadedChat = true
  }



}
