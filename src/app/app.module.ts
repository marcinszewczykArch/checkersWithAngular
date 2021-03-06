import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { BoardForWhiteComponent } from './board-for-white/board-for-white.component';
import { BoardForRedComponent } from './board-for-red/board-for-red.component';
import { ChooseColourComponent } from './choose-colour/choose-colour.component';
import { ChooseSingleMultiComponent } from './choose-single-multi/choose-single-multi.component';
import { MenuComponent } from './menu/menu.component';
import { CurrentMoveComponent } from './current-move/current-move.component';
import { FormsModule } from '@angular/forms';
import {WebsocketService} from "./services/websocket.service";
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { RoomsComponent } from './rooms/rooms.component';
import { PlayersComponent } from './players/players.component';
import { RulesComponent } from './rules/rules.component';
import { SavedGamesComponent } from './saved-games/saved-games.component';
import { BoardBottomComponent } from './board-bottom/board-bottom.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardForWhiteComponent,
    BoardForRedComponent,
    ChooseColourComponent,
    ChooseSingleMultiComponent,
    MenuComponent,
    CurrentMoveComponent,
    LoginComponent,
    ChatComponent,
    RoomsComponent,
    PlayersComponent,
    RulesComponent,
    SavedGamesComponent,
    BoardBottomComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
