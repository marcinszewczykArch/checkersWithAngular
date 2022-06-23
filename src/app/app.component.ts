import {Component, OnInit} from '@angular/core';
import {GameService} from "./services/game.service";
import {webSocket, WebSocketSubject} from "rxjs/webSocket";

const subject: WebSocketSubject<string> = webSocket(
  {
    url: "ws://localhost:8083/ws/angular",
    deserializer: e => e.data
  })

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadedChooseColour: Boolean = false;
  loadedWhite: Boolean = false;
  loadedRed: Boolean = false;
  loadedCurrentMove: Boolean = false;

  loadedChooseSingleMulti: Boolean = true;
  loadedSinglePlayer: Boolean = false;
  loadedMultiPlayer: Boolean = false;
  received: any[] = [];
  error: any = "error"
  message: string;

  constructor(public gameService: GameService) {
  }

  ngOnInit(): void {
    this.makeConnection()
  }

  makeConnection(): void {
    subject.subscribe(
      msg     => {if(msg.length>0) this.received.push(msg), console.log("ws message: " + msg)},
      err     => {this.error = err.error, console.log("ws error: " + err)},
      ()   => console.log("ws connection is closed")
    )
  }

  sentMessage(message: string): void {
    if (message.length > 0) {
      subject.next(message);
    }
    this.message = "";
  }

  makeComplete(): void {
    subject.complete();

  }

  makeError(): void {
    subject.error("broken!")
  }

}
