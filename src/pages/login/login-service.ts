// import {, RequestOptions, Response} from '@angular/http';
import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {BackStatProvider} from "../../providers/back-stat.provider";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {
  public headers: Object = {'Content-Type': 'application/json'};

  constructor(public http: HttpClient, private bs: BackStatProvider) {
  }

  sign_in(guest: Guest): Observable<Object> { // +++++++++++++++++++++++++++++++++++++++++++++++++> Sign in
    return this.http.post(`${this.bs.uri}/signin`, guest);
  }
}

class Guest {
  email: string;
  password: string;
}
