import { Injectable } from '@angular/core';

import {BehaviorSubject, Observable} from "rxjs";
import { of } from 'rxjs';
import {CheckersClientService} from "./checkers-client.service";

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  roomName: string;
  isGameMultiplayer: Boolean;

  board: any;
  movesNow: string;
  public movesNow2: BehaviorSubject<string> = new BehaviorSubject("w");
  nextMoveBy: any;
  status: any;

  playerWhite: any;
  playerRed: any;

  error: any;

  constructor() { }

}

