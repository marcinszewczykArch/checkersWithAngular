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
  rooms: any[] = ["room1","room2"];
  players: any[] = ["player1","player2"];
  error: any = "error"
  message: string;
  subject: WebSocketSubject<string>;
  playerName: string;

  constructor() {
  }

  initializeWebsocket(playerName: string) {
    this.subject = webSocket(
      {
        url: "ws://localhost:9000/ws/" + playerName,
        deserializer: e => e.data
      })
  }

  makeConnection(): void {
    this.subject.subscribe(
      msg     => {
        let inputType = msg.substring(0, 4);
        let inputValue = inputType.slice(5)
        console.log("ws message: " + msg)

        if (inputType == "/pla") { //players (send to all)
          this.players = inputValue.split(",")

        } else if(inputType == "/rms") { //rooms (send to all)
          this.rooms = inputValue.split(",")

        } else if(inputType == "/msg") { //msg (send to user / users in room)
          this.received.push(msg)

        } else if(inputType == "/gam") { //game (send to users in room)
          //todo: to be implemented
        }},

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

  sentMoveMessage(board: string, colour: string, from: string, to: string): void {
    this.subject.next("/move " + board + " " + colour + " " + from + " " + to);
    this.message = "";
  }

  joinRoom(roomName: string): void {
    this.subject.next("/room " + roomName);
    this.message = "";
  }

  listRooms(): void {
    this.subject.next("/rooms");
    this.message = "";
  }

  makeComplete(): void {
    this.subject.complete();

  }

  makeError(): void {
    this.subject.error("broken!")
  }

}
