/**
 * Created by juliannormand on 18/07/2017.
 */
import { Injectable } from '@angular/core';
import {Team} from "../classes/team.class";

@Injectable()
export class BackStatProvider {
  public _token: string;
  public _teams: Team[];
  public _uri: string = 'http://127.0.0.1:8080';
  constructor () {}

  set_token(token: string) {
    this._token = token;
  }

  get_token() {
    return this._token;
  }

  get_uri() {
    return this._uri;
  }
}
