import {Injectable, Inject} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Team, TeamFull} from '../../classes/team.class';
// import { Game } from '../../classes/game.class';
// import { BackstatService } from '../../providers/backstat-service';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {BackStatProvider} from "../../providers/back-stat.provider";

@Injectable()
export class DashboardService {
  public headers: Object = {'Content-Type': 'application/json'};
  public token: string = null;

  // Initialisation for the storage api
  constructor(public http: Http,
              public storage: Storage,
              public bs: BackStatProvider) {
  }

  /**
   * Get the list of all the teams
   * @returns {Observable<Team[]>}
   */
  get_teams(): Observable<Team[]> {
    let headers = new Headers({'x-access-token': this.bs.get_token()});
    let options = new RequestOptions({headers: headers});

    return this.http.get(`${this.bs.get_uri()}/teams`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
  }

  /**
   * Get the actual team selected by the user
   * @param  {string}               team_id [the id of the team selected]
   * @return {Observable<TeamFull>}         [the team selected]
   */
  get_team(team_id: string): Observable<TeamFull> {
    let headers = new Headers({'x-access-token': this.bs.get_token()});
    let options = new RequestOptions({headers: headers});

    return this.http.get(`${this.bs.get_uri()}/teams/${team_id}/full`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  /*  delete_team(_id: String) {
   let headers = new Headers({ 'x-access-token': this.token });
   let options = new RequestOptions({ headers: headers });

   return this.http.delete(`${this.config.apiEndpoint}teams/${_id}`, options)
   .map((res: Response) => res.json())
   .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
   }*/

  /*  get_games(team_id: String): Observable<Game[]> {
   let headers = new Headers({ 'x-access-token': this.token });
   let options = new RequestOptions({ headers: headers });
   if (this.config.network) {
   return this.http.get(`${this.config.apiEndpoint}teams/${team_id}/games`, options)
   .map((res: Response) => res.json())
   .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
   } else {
   let games = GAMES.filter(game => {
   return game.team_id === team_id;
   });
   return Observable.of(games);
   }
   }*/
}
