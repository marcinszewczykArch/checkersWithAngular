import { Component, OnInit } from '@angular/core';
import {GameService} from "../services/game.service";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-choose-colour',
  templateUrl: './choose-colour.component.html',
  styleUrls: ['./choose-colour.component.css']
})
export class ChooseColourComponent implements OnInit {

  constructor(public appComponent: AppComponent) {
  }

  loadWhite() {
    this.appComponent.loadedWhite = true
    this.appComponent.loadedRed = false
    this.appComponent.loadedChooseColour = false
    this.appComponent.loadedCurrentMove = true
  }

  loadRed() {
    this.appComponent.loadedRed = true
    this.appComponent.loadedWhite = false
    this.appComponent.loadedChooseColour = false
    this.appComponent.loadedCurrentMove = true
  }

  ngOnInit(): void {
  }

}
