import { Component, OnInit } from '@angular/core';
import {GameService} from "../services/game.service";

@Component({
  selector: 'app-current-move',
  templateUrl: './current-move.component.html',
  styleUrls: ['./current-move.component.css']
})
export class CurrentMoveComponent implements OnInit {

  constructor(public gameService: GameService) {
  }

  ngOnInit(): void {
  }

}
