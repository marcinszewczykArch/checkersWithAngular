import { Injectable } from "@angular/core";
import {WebsocketService} from "./websocket-service";
import {Subject} from "rxjs";


const CHAT_URL = "ws://echo.websocket.org/";

export interface Message {
  author: string;
  message: string;
}

@Injectable()
export class ChatService {
  public messages: Subject<Message>;

  constructor(wsService: WebsocketService) {
    // @ts-ignore
    this.messages = <Subject<Message>>wsService.connect(CHAT_URL).map(
      (response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          author: data.author,
          message: data.message
        };
      }
    );
  }
}
