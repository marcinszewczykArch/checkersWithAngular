import { Component, OnInit } from '@angular/core';
import {CheckersClientService} from "../services/checkers-client.service";
import {GameService} from "../services/game.service";

@Component({
  selector: 'app-board-for-white',
  templateUrl: './board-for-white.component.html',
  styleUrls: ['./board-for-white.component.css']
})
export class BoardForWhiteComponent implements OnInit {

  constructor(public gameService: GameService) {
  }

  action1(id: string) {
    this.gameService.action1(id)
  }

  ngOnInit(): void {
    this.gameService.ngOnInit()
  }

}
