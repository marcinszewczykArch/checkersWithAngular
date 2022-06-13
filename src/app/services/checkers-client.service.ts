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
  ROOT = 'http://localhost:8081';

  constructor(private httpClient: HttpClient) {
  }

  // @ts-ignore
  public getState(board: string, currentColour: string, moveFrom: number, moveTo: number) {
    return this.httpClient.get<State>(this.ROOT + '/api/checkers' +
      '?board='         + board +
      '&currentColour=' + currentColour +
      '&moveFrom='      + moveFrom +
      '&moveTo='        + moveTo);
  }
}

export interface State {
  board: string;
  currentColour: string;
}

