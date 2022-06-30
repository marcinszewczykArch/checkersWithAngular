import { Injectable } from '@angular/core';
import {Status} from "./checkers-client.service";

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  board: any;
  movesNow: any;
  nextMoveBy: any;
  status: Status;

  constructor() { }
}

