import { Injectable } from "@angular/core";
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {CheckersClientService, GameState} from "./checkers-client.service";
import {GameService} from "./game.service";
import {GameStateService} from "./game-state.service";
import {formatDate} from "@angular/common";
import * as moment from 'moment';

const STATE: string = "/state"
const MOVE: string = "/move"
const CHAT: string = "/chat"
const ERROR: string = "/error"

@Injectable()
export class WebsocketService {

  received: any[] = [];
  message: string;
  subject: WebSocketSubject<string>;
  playerName: string;
  multiplayerState: MultiplayerState;
  lastTimestamp: Date | undefined;


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
        console.log("ws input: " + msg)

      if (msg.startsWith(STATE)) {
        let state = msg.replace(STATE,'').trim()
        this.multiplayerState = JSON.parse(state)

      } else if(msg.startsWith(MOVE)) {
        let move = msg.replace(MOVE, '').trim()
        let gameState: GameState = JSON.parse(move)
        this.gameStateService.board       = gameState.board
        this.gameStateService.movesNow    = gameState.movesNow
        this.gameStateService.status      = gameState.status
        this.gameStateService.nextMoveBy  = gameState.nextMoveBy

      } else if(msg.startsWith(CHAT)) {
        let chatMsg = msg.replace(CHAT, '').trim()
        this.addTimeStampAndBreakLineAfter5Sec();
        this.received.push(chatMsg)

      } else if(msg.startsWith(ERROR)) {
        let errorMsg = msg.replace(ERROR, '').trim()
        this.gameStateService.error = errorMsg

      } else  {
        this.gameStateService.error = msg
      }
    },

      err     => {this.gameStateService.error = err.error, console.log("ws error: " + err)},
      ()   => console.log("ws connection is closed")
    )
  }


  addTimeStampAndBreakLineAfter5Sec() {
    if (this.lastTimestamp === undefined){
      this.lastTimestamp = new Date();

    } else if(this.lastTimestamp < new Date(Date.now() - 5000)) {
      this.lastTimestamp = new Date();
      let time = (moment(this.lastTimestamp)).format('HH:mm:ss')
      this.received.push("")
      this.received.push(time)
    }
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
