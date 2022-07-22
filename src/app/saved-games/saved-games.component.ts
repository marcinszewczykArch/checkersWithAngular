import { Component, OnInit } from '@angular/core';
import {CheckersClientService} from "../services/checkers-client.service";

@Component({
  selector: 'app-saved-games',
  templateUrl: './saved-games.component.html',
  styleUrls: ['./saved-games.component.css']
})
export class SavedGamesComponent implements OnInit {
  savedStates: any

  constructor(public checkersClientService: CheckersClientService) { }

  ngOnInit(): void {
    this.checkersClientService.getSavedStates().subscribe(value => {
      this.savedStates = value;
    })
  }



}
