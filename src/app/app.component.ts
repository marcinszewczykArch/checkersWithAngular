import {Component, OnInit} from '@angular/core';
import {CheckersClientService} from "./services/checkers-client.service";
import {GameService} from "./services/game.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadedChooseColour: Boolean = false;
  loadedWhite: Boolean = false;
  loadedRed: Boolean = false;

  loadedChooseSingleMulti: Boolean = true;
  loadedSinglePlayer: Boolean = false;
  loadedMultiPlayer: Boolean = false;

  constructor(public gameService: GameService) {
  }

  ngOnInit(): void {
  }
}
