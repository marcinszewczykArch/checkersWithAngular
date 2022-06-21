import { Component, OnInit } from '@angular/core';
import {GameService} from "../services/game.service";

@Component({
  selector: 'app-board-for-red',
  templateUrl: './board-for-red.component.html',
  styleUrls: ['./board-for-red.component.css']
})
export class BoardForRedComponent implements OnInit {

  constructor(public gameService: GameService) {
  }

  action1(id: string) {
    this.gameService.action1(id)
  }

  ngOnInit(): void {
    this.gameService.ngOnInit()
  }

}
