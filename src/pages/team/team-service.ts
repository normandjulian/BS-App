import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {BackStatProvider} from "../../providers/back-stat.provider";

@Injectable()
export class TeamService {
  constructor(public http: Http, public bs: BackStatProvider) {
  }

  /**
   * Create a new team
   * @param {Team} team
   * @returns {Observable<Team>}
   */
  create_team(team): Observable<Object> {
    let headers = new Headers({'x-access-token': this.bs.get_token()});
    let options = new RequestOptions({headers: headers});

    return this.http.post(`${this.bs.get_uri()}/teams`, team, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
