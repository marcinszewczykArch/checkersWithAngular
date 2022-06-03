import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";



const httpOptions = {
  headers: new HttpHeaders({
    // 'Content-Type': 'application/json',
     'Content-Type': 'text',
    // Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CheckersClientService {

//BACKEND ON SERVER OR FROM LOCALHOST
 //ROOT = 'https://backvisitting.herokuapp.com';
  ROOT = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  public getBoardState(state: string, move: string) {
    // @ts-ignore
    return this.httpClient.get<string>(this.ROOT + '/api/checkers?state=' + state + '&move=' + move, {responseType: 'text'});
  }

  public getState(board: string, currentColour: string, moveFrom: number, moveTo: number): Observable<State>{
    return this.httpClient.get<State>(this.ROOT + '/api/checkers2');
  }

}


export interface State {
  board: string;
  currentColour: string;
  moveFrom: number;
  moveTo: number;
}

