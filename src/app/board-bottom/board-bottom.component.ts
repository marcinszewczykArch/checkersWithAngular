import { Component, OnInit } from '@angular/core';
import {CheckersClientService} from "../services/checkers-client.service";

@Component({
  selector: 'app-board-bottom',
  templateUrl: './board-bottom.component.html',
  styleUrls: ['./board-bottom.component.css']
})
export class BoardBottomComponent implements OnInit {

  constructor(public checkersClientService: CheckersClientService) { }

  ngOnInit(): void {
  }

}
