import { Injectable } from "@angular/core";
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {CheckersClientService} from "./checkers-client.service";



@Injectable()
export class WebsocketService {

  received: any[] = [];
  rooms: any[] = ["room1","room2","room3","room4","room5","room6"];
  players: any[] = ["player1","player2"];
  error: any = "error"
  message: string;
  subject: WebSocketSubject<string>;
  playerName: string;
  multiplayerState: MultiplayerState;

  constructor() {
  }

  initializeWebsocket(playerName: string) {
    this.subject = webSocket(
      {
        url: "ws://localhost:9000/ws/" + playerName,
        deserializer: e => e.data
      })
  }

  // makeConnection(): void {
  //   this.subject.subscribe(
  //     msg     => {
  //       let inputType = msg.substring(0, 4);
  //       let inputValue = msg.slice(5)
  //       console.log("ws message: " + msg)
  //
  //       if (inputType == "/pla") { //players (send to all)
  //         this.players = inputValue.split(",")
  //
  //       } else if(inputType == "/rms") { //rooms (send to all)
  //         this.rooms = inputValue.split(",")
  //
  //       } else if(inputType == "/msg") { //msg (send to user / users in room)
  //         this.received.push(msg)
  //
  //       } else if(inputType == "/gam") { //game (send to users in room)
  //         //todo: to be implemented
  //       }},
  //
  //     err     => {this.error = err.error, console.log("ws error: " + err)},
  //     ()   => console.log("ws connection is closed")
  //   )
  // }

  //string.startsWith(/state)
  //"/state{json}".replace('/state','');

  makeConnection(): void {
    this.subject.subscribe(
      msg     => {
      if(msg.includes("rooms")) {
        this.multiplayerState = JSON.parse(msg)
      } else  {
        this.received.push(msg)
      }
    },

      err     => {this.error = err.error, console.log("ws error: " + err)},
      ()   => console.log("ws connection is closed")
    )
  }

  sentMessage(message: string): void {
    if (message.length > 0) {
      this.subject.next(message);
    }
    this.message = "";
  }

  sentChatMessage(message: string): void {
    if (message.length > 0) {
      this.subject.next("/chat " + message);
    }
    this.message = "";
  }

  makeMove(board: string, colour: string, from: string, to: string): void {
    this.subject.next("/move " + board + " " + colour + " " + from + " " + to);
    this.message = "";
  }

  joinRoom(roomName: string): void {
    this.subject.next("/room " + roomName);
    this.message = "";
  }

  leaveRoom(): void {
    this.subject.next("/leaveRoom");
    this.message = "";
  }

  makeComplete(): void {
    this.subject.complete();
  }

  makeError(): void {
    this.subject.error("broken!")
  }

}

export interface Room {
  name: string;
  players: string[];
}

export interface MultiplayerState {
  players: string[];
  rooms: Room[];
}
