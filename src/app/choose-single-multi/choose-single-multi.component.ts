import { Component, OnInit } from '@angular/core';
import {GameService} from "../services/game.service";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-choose-single-multi',
  templateUrl: './choose-single-multi.component.html',
  styleUrls: ['./choose-single-multi.component.css']
})
export class ChooseSingleMultiComponent implements OnInit {

  constructor(public appComponent: AppComponent) {
  }

  loadSinglePlayer() {
    this.appComponent.loadedLogin = true
    this.appComponent.loadedChooseSingleMulti = false
  }

  loadMultiPlayer() {
    this.appComponent.loadedChooseColour = true
    this.appComponent.loadedChooseSingleMulti = false
  }

  ngOnInit(): void {
  }

}
