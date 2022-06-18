import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { BoardForWhiteComponent } from './board-for-white/board-for-white.component';
import { BoardForRedComponent } from './board-for-red/board-for-red.component';
import { ChooseColourComponent } from './choose-colour/choose-colour.component';
import { ChooseSingleMultiComponent } from './choose-single-multi/choose-single-multi.component';
import { MenuComponent } from './menu/menu.component';
import { CurrentMoveComponent } from './current-move/current-move.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardForWhiteComponent,
    BoardForRedComponent,
    ChooseColourComponent,
    ChooseSingleMultiComponent,
    MenuComponent,
    CurrentMoveComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
