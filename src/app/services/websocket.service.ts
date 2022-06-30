import { Injectable } from "@angular/core";
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {CheckersClientService, GameState} from "./checkers-client.service";
import {GameService} from "./game.service";
import {GameStateService} from "./game-state.service";

const STATE: string = "/state"
const MOVE: string = "/move"
const CHAT: string = "/chat"

@Injectable()
export class WebsocketService {

  received: any[] = [];
  error: any = "error"
  message: string;
  subject: WebSocketSubject<string>;
  playerName: string;
  multiplayerState: MultiplayerState;


  constructor(public gameStateService: GameStateService) {
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
      if(msg.startsWith(STATE)) {
        let newState = msg.replace(STATE,'')
        this.multiplayerState = JSON.parse(newState)
      } else if(msg.startsWith(MOVE)) {
        let move = msg.replace(MOVE, '')
        let gameState: GameState = JSON.parse(move)
        this.gameStateService.board = gameState.board
        this.gameStateService.movesNow = gameState.movesNow
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


  createNewRoom(newRoomName: string): void {
    this.subject.next("/room " + newRoomName);
    this.message = "";
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
