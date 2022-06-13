import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { BoardForWhiteComponent } from './board-for-white/board-for-white.component';
import { BoardForRedComponent } from './board-for-red/board-for-red.component';
import { ChooseColourComponent } from './choose-colour/choose-colour.component';
import { ChooseSingleMultiComponent } from './choose-single-multi/choose-single-multi.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardForWhiteComponent,
    BoardForRedComponent,
    ChooseColourComponent,
    ChooseSingleMultiComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
