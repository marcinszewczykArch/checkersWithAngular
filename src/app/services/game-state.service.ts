import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  board: any;
  currentColour: any;


  constructor() { }
}
