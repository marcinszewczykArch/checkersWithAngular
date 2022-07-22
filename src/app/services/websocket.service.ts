import { Injectable } from "@angular/core";
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {GameStateService} from "./game-state.service";
import * as moment from 'moment';
import {MultiplayerState, GameState, Room} from "./checkers-client.service";

const STATE: string = "/state"
const CHAT: string = "/chat"
const ERROR: string = "/error"

@Injectable()
export class WebsocketService {

  //BACKEND ON SERVER OR FROM LOCALHOST
  ROOT = 'ws://checkersone.herokuapp.com/ws/';
  // ROOT = 'ws://localhost:9000/ws/';

  received: any[] = [];
  chatMessage: string;
  subject: WebSocketSubject<string>;
  playerName: string;
  multiplayerState: MultiplayerState;
  lastTimestamp: Date | undefined;


  constructor(public gameStateService: GameStateService) {
  }

  initializeWebsocket(playerName: string) {
    this.subject = webSocket(
      {
        url: this.ROOT + playerName,
        deserializer: e => e.data
      })
  }

  //incoming messages
  makeConnection(): void {
    this.subject.subscribe(
      msg     => {
        console.log("ws input: " + msg)

      if (msg.startsWith(STATE)) {
        let state = msg.replace(STATE,'').trim()
        let newState = JSON.parse(state)
        this.multiplayerState = newState
        // @ts-ignore
        let gameState: GameState = this.multiplayerState.rooms.find(room => room.name == this.gameStateService.roomName).gameState

        this.gameStateService.board       = gameState.board
        this.gameStateService.movesNow    = gameState.movesNow
        this.gameStateService.status      = gameState.status
        this.gameStateService.nextMoveBy  = gameState.nextMoveBy
        this.gameStateService.error       = ""

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

  //outgoing messages
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
    this.chatMessage = "";
  }

  makeMove(from: string, to: string): void {
    this.gameStateService.error = ""
    this.chatMessage = "";
    this.subject.next("/move " + from + " " + to);
  }

  createNewRoom(newRoomName: string): void {
    this.subject.next("/room " + newRoomName);
    this.chatMessage = "";
    this.gameStateService.roomName = newRoomName
  }

  leaveRoom(): void {
    this.subject.next("/leaveRoom");
    this.chatMessage = "";
  }

  joinRoom(roomName: string): void {
    this.subject.next("/room " + roomName);
    this.chatMessage = "";
    this.gameStateService.roomName = roomName
  }
}

