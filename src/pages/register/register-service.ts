import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';

import { Club } from '../../classes/club.class';
import { RegisterUser } from '../../classes/user.class';
import {HttpClient} from "@angular/common/http";
import {BackStatProvider} from "../../providers/back-stat.provider";

@Injectable()
export class RegisterService {
  constructor(public http: HttpClient, private bs: BackStatProvider) { }

  get_clubs(): Observable<Club[]> { // ++++++++++++++++++++++++++++++++++++++++++++++++++++++> Get Clubs
      return this.http.get<Club[]>(`${this.bs.get_uri()}/clubs`);
  };

  sign_up(guest: RegisterUser): Observable<Object> { // +++++++++++++++++++++++++++++++++++++++++++++++++> Sign up
    return this.http.post(`${this.bs.get_uri()}signup`, guest);
  }
}
