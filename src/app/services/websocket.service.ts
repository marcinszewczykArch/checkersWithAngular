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
      msg     => {this.received.push(msg), console.log("ws message: " + msg)},
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

  makeComplete(): void {
    this.subject.complete();

  }

  makeError(): void {
    this.subject.error("broken!")
  }

}
