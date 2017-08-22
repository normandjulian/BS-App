import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {BackStatProvider} from "../../providers/back-stat.provider";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {
  public headers: Object = {'Content-Type': 'application/json'};

  constructor(public http: Http, private bs: BackStatProvider) {
  }

  sign_in(guest: Guest): Observable<Object> { // +++++++++++++++++++++++++++++++++++++++++++++++++> Sign in
    let headers = new Headers(this.headers);
    let options = new RequestOptions({headers: headers});

    return this.http.post(`${this.bs.get_uri()}/signin`, guest, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}

class Guest {
  email: string;
  password: string;
}
