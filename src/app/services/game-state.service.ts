import { Injectable } from '@angular/core';
import {Status} from "./checkers-client.service";
import {BehaviorSubject, Observable} from "rxjs";
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  isGameMultiplayer: Boolean;

  board: any = 'rrrrrrrrrrrroooooooowwwwwwwwwwww'; //todo: initial state to take from server
  movesNow: string = "w"; //todo: initial state to take from server
  public movesNow2: BehaviorSubject<string> = new BehaviorSubject("w");
  nextMoveBy: any;
  status: Status;

  playerWhite: any;
  playerRed: any;

  error: any;

  constructor() { }

}

