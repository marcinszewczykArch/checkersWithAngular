import { Injectable } from '@angular/core';
import {Status} from "./checkers-client.service";

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  isGameMultiplayer: Boolean;

  board: any = 'rrrrrrrrrrrroooooooowwwwwwwwwwww'; //todo: initial state to take from server
  movesNow: any = 'w'; //todo: initial state to take from server
  nextMoveBy: any;
  status: Status;

  playerWhite: any;
  playerRed: any;

  error: any;

  constructor() { }

}

